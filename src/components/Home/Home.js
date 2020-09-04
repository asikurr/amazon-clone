import React, { useState } from 'react';
import './home-style.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Product from '../Product/Product';
import fakeData from '../../fakeData'

import Cart from '../Cart/Cart';

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
                            {
                                <Cart cart={cart} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;