import React, {useState, useEffect} from 'react';
import BasketItem from './BasketItem';

function Basket(props) {

    const [basket, setBasket] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8085/products', { headers: {
            'Access-Control-Allow-Origin':'*'}})
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });

        var b = sessionStorage.getItem('basket');
        console.log(JSON.parse(b));

        if (b != null) {setBasket(JSON.parse(b))}
        else setBasket(null);

    },[]);

    function renderTableData() {
        if (basket == null || JSON.stringify(basket) == "{}") return (<div style={{ backgroundColor: 'AliceBlue'}}> <h3>Basket is empty</h3> </div>)


        return products.map((element, key) => {
            if (element['id'] in basket) {
             return <BasketItem name={element['name']} num={basket[element['id']]} price={element['price']}></BasketItem>
            }
        })
    }

    return (
        <div>
         {renderTableData()}
        </div>
    );
}

export default Basket;