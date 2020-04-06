import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setproducts] = useState(first10 );
    const [cart, setcart] = useState([]);

    const handleAddProduct = (product) => {
         const newCart = [...cart, product];
         setcart(newCart);
        }
    return (
        <div className="shop-container">
            <div className="product-container">
        
                {
                    products.map(pd =>  <Product handleAddProduct={handleAddProduct} product={pd}></Product>)
                }
            
            </div>
            <div className="cart-container">
                <Cart cart ={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;