import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
    const {name,quantity,key,price } = props.product;
    return (
        <div className="product-name review-item">
            <h4>{name}</h4>
            <p>Quantity:{quantity}</p>
            <p>price: ${price}</p>
            <br/>
            <button onClick={()=>props.removeHandle(key)} className="main-btn">Remove</button>
            <br/>
        </div>
    );
};

export default ReviewItem;