import React, { useState } from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {key} = useParams();
    const [cart,setCart] = useState([]);
    const singleProduct = fakeData.find(pd => pd.key === key);
    return (
        <div>
            <Product addToCartBtn={false} product={singleProduct}></Product>
        </div>
    );
};

export default ProductDetails;