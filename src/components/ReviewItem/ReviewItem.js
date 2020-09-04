import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = (props) => {
    const {img, seller, name , price , quantity,key} = props.product;
    return (
        <div className="product__container d-flex py-3">
        <img className="mr-4 product__img" src={img} alt="" />
        <div className="product__details">
            <h4 className="product__title">{name}</h4> 
            <p>By {seller}</p>
            <p>Price:$ {price}</p>
            <p>Quantity: {quantity} </p>
            <button
            onClick={ () => props.removeCartItem(key)}
              className="btn btn-warning"><FontAwesomeIcon icon={faTrash} /> Remove Item</button>
       
            
        </div>
    </div>
    );
};

export default ReviewItem;