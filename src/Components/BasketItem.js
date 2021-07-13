import React from 'react';

function BasketItem(props) {
    return (
        <div style={{ backgroundColor: 'AliceBlue'}} >
            <h4> Item name: {props.name}</h4>
            <h4> Quantity: {props.num}</h4>
            <h4> Price: {props.price}</h4>
        </div>
    );

}

export default BasketItem;