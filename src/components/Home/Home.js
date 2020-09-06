import React, { useState, useEffect } from 'react';
import './home-style.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Product from '../Product/Product';
import fakeData from '../../fakeData'
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Home = () => {
    const data = fakeData.slice(0, 10)
    const [products, setProducts] = useState(data);
    const [cart, setCart] = useState([])
    // console.log(products)
    const handlerAddToCart = (product) => {
        // console.log("cart clicked.", product)

        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const otherProduct =  cart.filter(pdKey => pdKey.key!== product.key);
            newCart = [...otherProduct, sameProduct];
    
        }else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart)
        // console.log(count)
        addToDatabaseCart(product.key, count)

    }

    useEffect(()=>{
       const saveCart = getDatabaseCart();
       const productKey = Object.keys(saveCart)
       const cartProduct = productKey.map(key =>{
           const product = fakeData.find(data => data.key === key)
           product.quantity = saveCart[key];
           return product;
       })

       setCart(cartProduct)
       
    },[])

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