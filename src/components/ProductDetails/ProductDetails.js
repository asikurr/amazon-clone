import React from 'react';
import './productDetails-style.css'
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData'
import Product from '../Product/Product';


const ProductDetails = () => {
    const {productId} = useParams();
    const product = fakeData.find(pd => pd.key === productId)
    return (
        <div>
            <h2>Product details.</h2>
            <Product handlerAddToCart={false} product={product} />

        </div>
    );
};

export default ProductDetails;