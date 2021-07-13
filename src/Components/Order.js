import React, {useState, useEffect} from 'react';

function Order(props) {

    const [completed, setCompleted] = useState(0);
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        setCompleted(props.state.data[0]);

        fetch('http://localhost:8085/orderdetails', { mode: 'cors', headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/x-www-form-urlencoded',
            'Access-Control-Allow-Headers': 'orderid',
            'orderid' : props.id
        
        }})
            .then(res => res.json())
            .then(data => {
                setOrderDetails(data);
                console.log(data);
            });

    },[]);

    function payOrder() {
        fetch('http://localhost:8085/setorderstate', { method: 'POST' ,mode: 'cors', headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/x-www-form-urlencoded',
            'Access-Control-Allow-Headers': 'orderid',
            'orderid' : props.id
        
        }})
        .then(res => res.json())
        .then(data => {
            if (data['Answer]' == 'Order state changed']) {
                setCompleted(1);
            }
        });
    }

    function renderDetails() {
        return orderDetails.map((element, index) => {
            return <div>{element['name']} : {element['quantity']} x {element['price']} EUR</div>
        })
    }

    if (completed === 0) return (
        <div style={{ backgroundColor: 'red'}}>
            <p>
            <div>Order id: {props.id} </div>
            <div>Name: {props.name} </div>
            <div>Not completed</div>
            {renderDetails()}
            <button onClick={payOrder}>Complete order</button>
            </p>
        </div>
    )

    else return (
        <div style={{ backgroundColor: 'green'}}>
            <p>
            <div>Order id: {props.id} </div>
            <div>Name: {props.name} </div>
            <div>Completed</div>
            {renderDetails()}
            </p>
        </div>
    );
}

export default Order;