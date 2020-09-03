import React from 'react';
import './navbar-style.css'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../../images/amazon.png'
import { NavLink } from 'react-router-dom';

const TopNavBar = () => {
    return (
        <div className="nav-bar">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand >
                    <img className="img-fluid" src={logo} alt="Logo"/>
                </Navbar.Brand>
              
                <Nav className="ml-auto">
                    <NavLink to='/' className="nav-link">Shop</NavLink>
                    <NavLink to='/order' className="nav-link">Order</NavLink>
                    <NavLink to='/review' className="nav-link">Manage Inventory</NavLink>
                </Nav>

            </Navbar>
            
        </div>
    );
};

export default TopNavBar;