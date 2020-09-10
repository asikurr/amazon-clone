import React, { useState, useEffect } from 'react';
import './orderreview-style.css'
import { Container, Row, Col } from 'react-bootstrap';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import happpyimg from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const OrderReview = () => {
    const history = useHistory();
    const [cart, setCart] = useState([]);
    const [image, setImage] = useState(false)



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

    const handleProceedOrder = () => {
       history.push('/shipment')
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
                    {
                        image && <img src={image} alt=""/> 
                    }
                </Col>

                <Col md={3}>
                    <Cart cart={cart}>
                        <button
                            onClick={() => handleProceedOrder()}
                            className="btn btn-outline-warning btn-block">
                            <FontAwesomeIcon icon={faStreetView} /> Proceed Order</button>
                    </Cart>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderReview;