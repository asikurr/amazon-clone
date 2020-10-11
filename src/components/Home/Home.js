import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner'
import './home-style.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Product from '../Product/Product';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Home = () => {
    // const data = fakeData.slice(0, 10)
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [searchData, setSearchData] = useState('')
    // console.log(products)

    useEffect(() => {
        fetch('https://infinite-crag-48388.herokuapp.com/getProducts?search='+searchData)
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [searchData])

    const handleSearch = event => {
        setSearchData(event.target.value)
    }

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
    //    console.log(productKey, products)
    //    if (products.length){
    //        const cartProduct = productKey.map(key => {
    //            const product = products.find(data => data.key === key)
    //            product.quantity = saveCart[key];
    //            return product;
    //        })
    //        setCart(cartProduct)
    //    }
        fetch('https://infinite-crag-48388.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKey)
        })
            .then(response => response.json())
            .then(data => setCart(data))

    }, [])

  

    return (
        <Container fluid>
            <input type="text" onChange={handleSearch} className="form-control" placeholder="Search Product" />
            <Row>
                <Col md={9}>

                    {
                        products.length === 0 && 
                        <p className="spinning"><Loader type="Oval" color="#00BFFF" height={80} width={80} /></p>
                    }
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