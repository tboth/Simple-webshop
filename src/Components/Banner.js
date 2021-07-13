import React, { useEffect, useState } from 'react';

function Banner(props) {
    
    function incrementCounter() {
        fetch('http://localhost:8085/increment', {
            method: 'post',
            mode: 'no-cors'
        })
        .then(response => console.log(response));

    }

    return (
        <div  style={{ backgroundColor: 'gray'}} onClick={incrementCounter}>
        <center>
            <h1> Thank you for shopping with us! </h1>
            <p></p>
            <img src={'https://etiquettejulie.com/wp-content/uploads/2017/01/thank-you-from-christian-vision-alliance.jpg'} height={480} width={640}/>
            <p></p>
            <h1> We hope we see you around here soon </h1>
        </center>
        </div>
    );
}

export default Banner;