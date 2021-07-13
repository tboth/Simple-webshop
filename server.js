/*
This is the backend (server-side) of the application 
*/
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

//creating the DB connection
var pool        = mysql.createPool({
    connectionLimit : 2, 
    host            : 'mydb',
    user            : 'root',
    password        : 'root',
    db              : 'mysql',
    multipleStatements: true
});

pool.getConnection(function (err, connection) {

if (err) throw err;

// creating the database and inserting the 3 items into the database
// it was a assignment requirement to include this part into the server.js aswell
connection.query(`
CREATE database IF NOT EXISTS warehouse;
USE warehouse;

CREATE TABLE IF NOT EXISTS counter (
  id int NOT NULL AUTO_INCREMENT,
  value int NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT IGNORE INTO counter (id, value) VALUES
(1,	0);

CREATE TABLE IF NOT EXISTS  customer (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_bin NOT NULL,
  street varchar(255) COLLATE utf8_bin DEFAULT NULL,
  city varchar(255) COLLATE utf8_bin DEFAULT NULL,
  psc varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT customer_unique UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE IF NOT EXISTS orders (
  id int NOT NULL AUTO_INCREMENT,
  completed bit(1) NOT NULL,
  customer_id int NOT NULL,
  PRIMARY KEY (id),
  KEY customer_id (customer_id),
  CONSTRAINT order_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customer (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE IF NOT EXISTS product (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_bin DEFAULT NULL,
  image varchar(255) COLLATE utf8_bin DEFAULT NULL,
  price double DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT IGNORE INTO product (id, name, image, price) VALUES
(1,	'Windows 10 Home',	'https://cdn.vox-cdn.com/thumbor/GftiNa16m97qMeQf02C7gKd3p20=/0x0:1019x679/1200x800/filters:focal(0x0:1019x679)/cdn.vox-cdn.com/uploads/chorus_image/image/46725562/windows10boxart.0.0.jpg',	145),
(2,	'MS Office 365',	'https://5.imimg.com/data5/JK/TU/MY-36610008/microsoft-office-365-home-box-pack-281-year-29-500x500.jpg',	65),
(3,	'CorelDRAW suite 2020',	'https://www.fotovideoshop.sk/obchod_homedir/data/369/obrazky/CorelDRAW_Graphics_Suite_2020_WIN.jpg',	293);

CREATE TABLE IF NOT EXISTS product_order (
  product_id int NOT NULL,
  order_id int NOT NULL,
  quantity int NOT NULL,
  KEY product_id (product_id),
  KEY order_id (order_id),
  CONSTRAINT product_order_ibfk_1 FOREIGN KEY (product_id) REFERENCES product (id),
  CONSTRAINT product_order_ibfk_2 FOREIGN KEY (order_id) REFERENCES orders (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
`, 

    function (error, results, fields) {
        if (error) throw error;
        console.log('Database created and loaded');
    })
});

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/products', (req, res) => {
  pool.query('SELECT * FROM warehouse.product;',function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
})

app.post('/increment', (req, res) => {
  pool.query('USE warehouse; UPDATE counter SET value = value + 1 WHERE counter.id = 1;', function (error, results, fields) {
    if (error) {
      res.end(JSON.stringify({"Answer" : "Counter not incremented"}));
      throw error;
    }
    res.end(JSON.stringify({"Answer" : "Counter incremented"}));
  })
});

app.get('/getcountervalue',  (req, res) => {
  pool.query('USE warehouse; SELECT value FROM counter WHERE counter.id = 1;', function (error, results, fields) {
    if (error) {
      res.end(JSON.stringify({"Answer" : "Could not get counter value"}));
      throw error;
    }
    res.end(JSON.stringify(results[1][0]));
  })
});

app.post('/adduser', (req, res) => {
  if (req.headers.name != undefined && req.headers.street != undefined && req.headers.city != undefined && req.headers.psc != undefined) {
    pool.query(`USE warehouse; INSERT INTO customer (name, street, city, psc) 
    VALUES ('${req.headers.name}', '${req.headers.street}', '${req.headers.city}', '${req.headers.psc}');
    SELECT MAX(id) FROM customer;`, function (error, results, fields) {
      if (error) {
        if (error.code == 'ER_DUP_ENTRY')
        {
          pool.query(`USE warehouse; SELECT id from customer where customer.name='${req.headers.name}';`, function (err, rows) {
            
            console.log({"Answer" : "User already in the database", "id" : rows[1]});
            res.end(JSON.stringify({"Answer" : "User already in the database", "id" : rows[1]}));
          })

        }
      }

      else {
        res.end(JSON.stringify(results[2]));
      }
    });
  }
  else res.end(JSON.stringify("Not all parameters set!"));
});

app.post('/setorderstate', (req, res) => {
  if (req.headers.orderid != undefined) {
    pool.query(`USE warehouse; UPDATE orders SET completed =  1 WHERE orders.id = ${req.headers.orderid};` , function (error, results, fields) {
      if (error) {
        res.end(JSON.stringify( {"Answer" : "Could not set order to complete"}));
      }
      res.end(JSON.stringify({"Answer" : "Order state changed"}));

    });
  }
  else res.end(JSON.stringify({"Answer" : "Order id not not defined!"}));
});

app.get('/getallorders',  (req, res) => {
  pool.query('USE warehouse; SELECT customer.id, name, orders.id, completed FROM orders inner join customer on customer.id = orders.customer_id;', function (error, results, fields) {
    if (error) {
      res.end(JSON.stringify({"Answer" : "Could not get orders value"}));
      throw error;
    }
    res.end(JSON.stringify(results[1]));
  })
});

app.get('/orderdetails', (req, res) => {
  console.log(req.headers);
  if (req.headers.orderid != undefined) {

    pool.query(`USE warehouse; SELECT product.name, product.price, quantity from product_order inner join product on product.id = product_order.product_id WHERE order_id=${req.headers.orderid};`, function (error, results, fields) {
      if (error) {
        res.end(JSON.stringify({"Answer" : "Could not get orders value"}));
      }
      res.end(JSON.stringify(results[1]));
    })
  }

  else res.end(JSON.stringify({"Answer" : "No order ID set"}));
});

// details string : 1:2-2:5-3:0
// toto znamena ze z prveho produktu odjednali 2ks, z druheho 5 a z tretieho 0
app.post('/placeorder', (req,res) => {
  if (req.headers.userid != undefined && req.headers.details != undefined) {
    var products = req.headers.details.split('-');
    var orderid;

    pool.query(`USE warehouse; INSERT INTO orders (completed, customer_id) VALUES (0, ${req.headers.userid}); 
    SELECT MAX(id) as id FROM orders WHERE customer_id=${req.headers.userid};`, function (error, rows) {
      if (error) {
        res.end(JSON.stringify({"Answer" : "Could not place order"}));
      }

      orderid = rows[2][0].id;
      products.forEach((element, index) => {
        var productid = element.split(':')[0];
        var quantity = element.split(':')[1];
        if (quantity != '0') {

          pool.query(`USE warehouse; INSERT INTO product_order(product_id, order_id, quantity) VALUES (${productid},${orderid},${quantity})`, function (err,results,fiels) {
            if (err) res.end(JSON.stringify({"Answer" : "Could not place order"}));
          })
        }
 
        if (index === products.length-1) {
          res.send(JSON.stringify({"Answer" : "Order placed"}));
        }
      });
    });

  }
  else res.end(JSON.stringify({"Answer" : "No details set"}));
})



app.listen(8080,()=>{
    console.log('listening');
});