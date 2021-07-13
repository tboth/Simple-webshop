import React, { useEffect, useState } from 'react';

function OrderForm(props) {

    const [enteredName, setEnteredName] = useState('');
    const [enteredAddress, setEnteredAddress] = useState('');
    const [enteredCity, setEnteredCity] = useState('');
    const [enteredPostCode, setEnteredPostCode] = useState('');

    function handleSubmit() {

      let headers = {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers': 'name,city,street,psc',
        'Content-Type':'application/x-www-form-urlencoded',
        'name' : enteredName,
        'city' : enteredAddress,
        'street' : enteredCity,
        'psc' : enteredPostCode
      };


      var userid = null;

      let user = fetch('http://localhost:8085/adduser', {method:'POST', mode : 'cors', headers: headers})
      .then(response => response.json())
      .then(jsd => {
          if (jsd === 'Not all parameters set!') {
            alert('Please fill every field to complete order');
          }

          else {

            var userid;
            
            if (jsd['Answer'] === 'User already in the database') {
              userid = jsd['id'][0]['id'];
            }
  
            else {
              console.log(userid);
              userid = jsd[0]["MAX(id)"]; 
            }

            console.log(userid);

            var basket = JSON.parse(sessionStorage.getItem('basket'));

            if (basket == null || JSON.stringify(basket) == "{}") {
              alert("Your basket is empty");
            }

            else {
              var details = '';

              Object.keys(basket).forEach(key => {
                details = details + key + ":" + basket[key] + '-';
              });

              details = details.slice(0, -1);

              let orderHeaders = {

                  'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Headers': 'userid,details',
                  'Content-Type':'application/x-www-form-urlencoded',
                  'userid' : userid,
                  'details' : details

              }

              fetch('http://localhost:8085/placeorder', {method:'POST', mode : 'cors', headers: orderHeaders}).then(response => response.json()).then(
                jsondata => {
                  if (jsondata['Answer'] === 'Order placed') {
                    sessionStorage.removeItem('basket');
                    alert("Order placed");
                  }  

              });

          }

      }

    });

      event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
        <label>
          Name:              
          <input type="text" onChange={(evt) => {setEnteredName(evt.target.value)}} /> 
          </label>
          <br/>
          <label>
          Address and number:
          <input type="text" onChange={(evt) => {setEnteredAddress(evt.target.value)}} /> 
          </label>
          <br/>
          <label>
          City:              
          <input type="text" onChange={(evt) => {setEnteredCity(evt.target.value)}} /> 
          </label>
          <br/>
          <label>
          Post number (PSC):
          <input type="text" onChange={(evt) => {setEnteredPostCode(evt.target.value)}} />  
          </label>
        <input type="submit" value="Submit" />
      </form>
    )
}

export default OrderForm;