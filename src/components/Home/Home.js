import React, { useState } from 'react';
import './home-style.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Product from '../Product/Product';
import fakeData from '../../fakeData'
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Home = () => {
    const data = fakeData.slice(0, 10)
    const [products, setProducts] = useState(data);
    const [cart, setCart] = useState([])
    // console.log(products)
    const handlerAddToCart = (product) => {
        // console.log("cart clicked.", product)
        const newCart = [...cart, product];
        setCart(newCart)

        const sameProduct = newCart.filter(pd => pd.key === product.key);
        // console.log(sameProduct)
        const count = sameProduct.length;
        // console.log(count)
        addToDatabaseCart(product.key, count)

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
                                <Cart cart={cart}>
                                <Link to={'/orderriview'}> <button
                                        className="btn btn-outline-warning btn-block">
                                        <FontAwesomeIcon icon={faStreetView}/> 
                                        Product Review</button></Link>
                                </Cart>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;