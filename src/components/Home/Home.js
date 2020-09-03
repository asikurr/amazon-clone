import React, { useState } from 'react';
import './home-style.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Product from '../Product/Product';
import fakeData from '../../fakeData'
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    const data = fakeData.slice(0, 10)
    const [products, setProducts] = useState(data);
    const [cart, setCart] = useState([])
    // console.log(products)
    const handlerAddToCart = (product) => {
        // console.log("cart clicked.", product)
        const newCart = [...cart, product];
        setCart(newCart)

    }
    return (
        <Container fluid>
            <Row>
                <Col md={9}>
                    {
                        products.map(product =>
                            <Product
                                key={product.key}
                                product={product}
                                handlerAddToCart={handlerAddToCart}
                            />)
                    }

                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <p >Total Items : {cart.length}</p>
                            <p>Total Price : </p>
                            <p>Shipment Cost : </p>
                            <p>Tax 8% : </p>
                            <p>Grand Total : </p>
                            <button className="btn btn-outline-warning btn-block"><FontAwesomeIcon icon={faStreetView} /> Product Review</button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;