import React, {useState, useEffect} from 'react';

import Order from './Order';

function OrderList(props) {
    
    const [bannerClicks, setBannerClicks] = useState(0);
    const [orderList, setOrderList] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8085/getcountervalue', { mode: 'cors', headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/x-www-form-urlencoded'}})
            .then(res => res.json())
            .then(data => {
                setBannerClicks(data['value']);
                console.log(data);
            });


        fetch('http://localhost:8085/getallorders', { mode: 'cors', headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/x-www-form-urlencoded'}})
            .then(res => res.json())
            .then(data => {
                setOrderList(data);
                 console.log(data);
            });
        
    },[]);

    function listOrders() {
        return orderList.map((element, index) => {
            return(<Order key={element['id']} id={element['id']} name={element['name']} state={element['completed']}/>);
        });
    }

    return (
        <>
        <p>Banner click count: {bannerClicks}</p>
        <p>All orders in the warehouse:</p>
        {listOrders()}
        </>
    );

}

export default OrderList;