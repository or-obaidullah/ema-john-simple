import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart,setCart] =useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey]; //quantity
            return product;
        })
        setCart(previousCart);
    },[])



    const handleAddProduct = (product) => {
        // console.log('product Added',product);
        const toBeAdded = product.key;
        const sameProduct= cart.find(pd=> pd.key === toBeAdded);
        let count =1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity +1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }else{
            product.quantity=1;
            newCart = [...cart, product];
        }
        setCart(newCart);


        // const newCart = [...cart, product];
        // setCart(newCart);
        // const sameProduct= newCart.filter(pd=> pd.key === product.key);
        // const count = sameProduct.length;
        addToDatabaseCart(product.key,count);
    }

    
    return (
        <div className='shop-container'>
            <div className="product-container">

                {
                    products.map(pd => <Products 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}
                        ></Products>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to={'/review'}><button className="main-btn">Order Review</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;