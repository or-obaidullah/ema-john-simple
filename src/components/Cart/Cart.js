import React from 'react';
import { Link } from 'react-router-dom';
const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total,product) => total+product.price,0);
    let total =0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total+ product.price  * product.quantity;
        
    }
    let shippingCost =0;
    if(total>50){
        shippingCost = 0;
    }
    else if(total>30){
        shippingCost = 4.99;
    }
    else if(total > 0){
        shippingCost = 12.99;
    }
    let tax = total/10;

    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return precision;
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Order: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping Cost: {shippingCost}</p>
            <p>Tax. + VAT : {formatNumber(tax)}</p>
            <p>Total Price: {formatNumber(total + shippingCost + tax)}</p>
            {/* <Link to={'/review'}><button className="main-btn">Order Review</button></Link> */}
            {
                props.children
            }
        </div>
    );
};

export default Cart;