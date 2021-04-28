import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //const total = cart.reduce( (total,prtd)=>total+prtd.price, 0);
    let total = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total+ product.price;
    }
    let shipping = 0;
    if(total>50){
        shipping =0;
    }
    else if(total>15){
        shipping = 5;
    }
    else if(total>0){
        shipping = 10;
    }
    //const tax = Math.round(total/10);
    const tax =total/10;
    const grandTotal = Math.round(shipping+total + Number(tax))
    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summery: wow</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + Vat : {formatNumber(tax)}</small></p>
            <p>Total price: {grandTotal}</p>
        </div>
    );
};

export default Cart;