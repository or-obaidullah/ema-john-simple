import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Products = (props) => {
    // console.log(props);
    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4><Link to={'/product/'+key}>{name}</Link></h4>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                { props.showAddToCart &&
                    <button onClick={()=>props.handleAddProduct(props.product)} className="main-btn"><FontAwesomeIcon icon={faShoppingCart} />Add to Cart</button>
                }
            </div>

        </div>
    );
};

export default Products;