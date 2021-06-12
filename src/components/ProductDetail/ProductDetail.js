import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Products from '../Products/Products';

const ProductDetail = () => {
    const {productkey} =useParams();
    const product = fakeData.find(pd => pd.key === productkey);
    console.log(product);
    return (
        <div>
            <h1>Product detail Details</h1>
            <Products showAddToCart={false} product={product}></Products>
        </div>
    );
};

export default ProductDetail;