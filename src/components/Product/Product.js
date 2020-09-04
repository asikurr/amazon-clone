import React from 'react';
import './product-style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = ({product, handlerAddToCart}) => {
    const {img,name, price, stock, seller, key} = product
    return (
        <div className="product__container d-flex py-3">
            <img className="mr-4 product__img" src={img} alt="" />
            <div className="product__details">
                 <Link to={`product/${key}`}><h3 className="product__title">{name}</h3></Link> 
                <p>By {seller}</p>
                <p>Price:$ {price}</p>
                <p>Stock: only {stock} left in stock. order soon</p>
                <button onClick={()=>handlerAddToCart(product)} className="btn btn-warning"><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;