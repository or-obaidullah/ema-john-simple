import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    const history = useHistory()
    const handleCheckout = () => {
        // setCart([]);
        // setOrderPlace(true);
        // processOrder();
        history.push('/shipment');
    }

    const removeHandle = (productKey) => {
        console.log('click',productKey);
        const newCart = cart.filter(pd=> pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        console.log(productKeys);
        // const productValues = Object.values(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd=> pd.key === key);
            product.quantity = savedCart[key];
            return product
        });
        setCart(cartProducts);
    },[])


    let thankyou;
    if(orderPlace){
        thankyou =<img src={happyImage} alt=""/>
    }
    return (
        <div className="shop-container">
            
            <div className="product-container">
            {
                cart.map(pd=> <ReviewItem removeHandle={removeHandle} key={pd.key} product={pd}></ReviewItem>)
            }
            {
                thankyou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <button onClick={handleCheckout} className="main-btn">Proceed Checkout</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;