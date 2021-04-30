import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

const Review = () => {
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    },[])
    console.log(cart);

    const handleRemoveBtn = (productKey) => {
        const newCart = cart.filter(pd=> pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                 {
                     cart.map(pd => <Product product={pd} removeBtn={true} handleRemoveBtn ={handleRemoveBtn}></Product>)
                 }
            </div>
            <div className="cart-container" >
                <Cart  cart ={cart}>
                    <button className='main-button'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;