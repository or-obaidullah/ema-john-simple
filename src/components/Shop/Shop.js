import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setproducts] = useState(first10 );
    const [cart, setcart] = useState([]);

    const handleAddProduct = (product) => {
         const toBeAdded = product.key;
         const sameProduct = cart.find(pd => pd.key === toBeAdded);
         let count =1;
         let newCart;
         if(sameProduct){
            count = sameProduct.quantity +1;
            sameProduct.quantity = count;

            const other = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...other,sameProduct];
         }else{
            product.quantity=1;
            newCart = [...cart, product];
         }
         setcart(newCart);
         addToDatabaseCart(product.key,count);
        }

    return (
        <div className="shop-container">
            <div className="product-container">
        
                {
                    products.map(pd =>  <Product addToCartBtn={true} handleAddProduct={handleAddProduct} product={pd}></Product>)
                }
            
            </div>
            <div className="cart-container">
                <Cart cart ={cart}>
                    <Link to='/review'><button className='main-button'>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;