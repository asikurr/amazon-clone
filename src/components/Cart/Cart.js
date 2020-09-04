import React from 'react';
import './cart-style.css'

import { Card } from 'react-bootstrap';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((price, cart) => price + cart.price, 0)
    // console.log(total)

    let shipMentCost = 0;
    if (total > 0 && total <= 15) {
        shipMentCost = 9.99
    } else if (total > 15 && total <= 35) {
        shipMentCost = 4.99
    } else if (total > 35) {
        shipMentCost = 0
    }

    const tax = total * 8 / 100;
    const grandTotal = total + shipMentCost + tax;

    const toFixeds = (num) => {
        const amounts = num.toFixed(2);
        return Number(amounts);
    }

    return (
        <>
            <Card.Title>Order Summary</Card.Title>
            <p >Total Items : {cart.length}</p>
            <p>Total Price : {toFixeds(total)}</p>
            <p>Shipment Cost : {toFixeds(shipMentCost)}</p>
            <p>Tax 8% : {toFixeds(tax)}</p>
            <p>Grand Total : {toFixeds(grandTotal)}</p>
            {
                props.children
            }
        </>
    );
};

export default Cart;