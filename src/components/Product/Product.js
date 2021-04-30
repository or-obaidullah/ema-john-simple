import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props);
    const { img, name, seller, price, stock,key,quantity } = props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <Link to={'/product/'+ key}><h4 className="product-name">{name}</h4></Link>
                <br />
                {   props.removeBtn &&
                    <p>Quantity: {quantity}</p>
                }
                <p><small>{seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock - order soon</small></p>
                {
                    props.addToCartBtn &&
                    <button onClick={() => props.handleAddProduct(props.product)} className="main-button" > <FontAwesomeIcon icon={faShoppingCart}/> add to cart</button>
                }
                {
                    props.removeBtn &&
                    <button  className="main-button" onClick={()=>props.handleRemoveBtn(key)} > Remove</button>
                }
                
            </div>

        </div>
    );
};

export default Product;