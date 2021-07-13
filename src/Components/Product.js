import React from 'react';


function Product(props) {
    function addToBasket() {
        var x = sessionStorage.getItem("basket");
        console.log(x);

        var key = props.id;

        if (x == null) {
            var basket = {};
            basket[key] = 1;
            sessionStorage.setItem("basket",JSON.stringify(basket));
            console.log(basket);
        }

        else {
            var basket = JSON.parse(x);
            if (basket.hasOwnProperty(key)) {
                basket[key] = basket[key] + 1;
            }

            else {
                basket[key] = 1;
            }

            
            sessionStorage.setItem("basket",JSON.stringify(basket));
            console.log(basket);
        }
    }

    function removeFromBasket() {
        var x = sessionStorage.getItem("basket");
        var key = props.id;
        var basket = JSON.parse(x);

        if (x != null) {
            if (basket.hasOwnProperty(key)) {
                if(basket[key] > 0) {
                    basket[key] = basket[key] - 1;
                    if (basket[key] === 0) {
                        delete basket[key];
                    }

                    sessionStorage.setItem("basket",JSON.stringify(basket));
                    console.log(basket);
                }
            }
        }
    }

    return (
        <div class="Product" style={{ backgroundColor: 'AliceBlue'}}>
            <h1> {props.name} </h1>
            <img src={props.image} height={100} width={120}/>
            <h3> Price: {props.price} EUR </h3>
            <button onClick={addToBasket}> Add 1 piece to basket </button>
            <button onClick={removeFromBasket}> Remove 1 piece from basket</button>
        </div>
    );
}

export default Product;