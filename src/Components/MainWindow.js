import React, {useState} from 'react';
import Basket from './Basket';
import OrderList from './OrderList';
import ProductList from './ProductList';
import Banner from './Banner';
import OrderForm from './OrderForm';

function MainWindow(props) {

    //product, admin, banner, basket, order
    const [currentWindow, setCurrentWindow] = useState('product');

    function showBasket() {
        setCurrentWindow('basket');
    }

    function showProducts() {
        setCurrentWindow('product');
    }

    function showAdminPage() {
        setCurrentWindow('admin');
    }

    function showBanner() {
        setCurrentWindow('banner');
    }

    function showOrder() {
        setCurrentWindow('order');
    }

    if (currentWindow === 'product') {
        return (
        <div>
            <button onClick={showBasket}> Basket </button>
            <button onClick={showAdminPage}> Admin page </button>
            <ProductList/>
        </div>
        );
    }


    else if (currentWindow === 'admin') {
    return (
        <>
        <button onClick={showProducts}> Back to products </button>
        <OrderList/>
        </>
    );

    }

    
    else if (currentWindow === 'banner') {
    return (
        <>
        <Banner/>
        <button onClick={showProducts}> Back to products </button>
        </>
    );

    }
    
    else if (currentWindow === 'basket') { 
    return (
        <>
        <button onClick={showProducts}> Back to product page </button>
        <Basket/>
        <button onClick={showOrder}> Go to order page </button>
        </>
    );

    }

    
    else if (currentWindow === 'order') {
    return (
        <>
        <button onClick={showBasket}> Back to basket </button>
        <OrderForm/>
        <button onClick={showBanner}>Next </button>
        </>
    );

    }

    else {
        return (
            <div>Loading</div>
        )
    }

}


export default MainWindow;