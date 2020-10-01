import React, { useState, useEffect} from 'react';
import './productDetails-style.css'
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';


const ProductDetails = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('https://infinite-crag-48388.herokuapp.com/product/'+ productId)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productId])
    // const product = products.find(pd => pd.key === productId)
    return (
        <div>
            <h2>Product details.</h2>
            <Product handlerAddToCart={false} product={product} />

        </div>
    );
};

export default ProductDetails;