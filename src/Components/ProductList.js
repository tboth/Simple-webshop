import { json } from 'body-parser';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Basket from './Basket.js';
import Product from './Product.js';

function ProductList(props) {

    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(()=>{
        fetch('http://localhost:8085/products', { headers: {
            'Access-Control-Allow-Origin':'*'}})
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoaded(true);
                console.log(data);
            });
    },[]);



    function renderProducts() {
        return products.map((product,index)=>{
            return <Product
                id={product['id']}
                name={product['name']}
                image={product['image']}
                price={product['price']}
                ></Product>
        });
    }

    if(isLoaded) {
        return (
            <div>
                {renderProducts()}
            </div>
        );
    }
    else {
        return <div>Loading...</div>
    }
}
export default ProductList;