import React, { useState, useEffect } from 'react';
import './orderreview-style.css'
import { Container, Row, Col } from 'react-bootstrap';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrderReview = () => {
    const [cart, setCart] = useState([]);



    useEffect(() => {
        const saveCart = getDatabaseCart();
        const dataKey = Object.keys(saveCart);
        const cartProduct = dataKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            // console.log(product);
            return product;

        })
        setCart(cartProduct);

    }, [])

    // const handlerRemoveCart = (cartKey) => {
    //     // console.log('clicked', cardKey)
    //     const removeItem = cart.filter(pd => pd.key !== cartKey);
    //     // console.log(removeItem)
    //     setCart(removeItem);
    //     removeFromDatabaseCart(removeItem);

    // }
    const removeCartItem = (cartKey) => {
        // console.log("cartKey",cartKey)
        const newCart = cart.filter(pd => pd.key !== cartKey)
        setCart(newCart)
        removeFromDatabaseCart(cartKey)

    }

    return (
        <Container>
            <Row>
                <Col md={9}>
                    {
                        cart.map(pd =>
                            <ReviewItem

                                removeCartItem={removeCartItem}
                                key={pd.key}
                                product={pd}

                            />)
                    }
                </Col>

                <Col md={3}>
                    <Cart cart={cart}>
                        <button
                            className="btn btn-outline-warning btn-block">
                            <FontAwesomeIcon icon={faStreetView} /> Place Order</button>
                    </Cart>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderReview;