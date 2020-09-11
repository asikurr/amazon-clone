import React, {useContext} from 'react';
import './navbar-style.css'
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../images/amazon.png'
import { NavLink, Link } from 'react-router-dom';
import { userContext } from '../../App';

const TopNavBar = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)

    return (
        <div className="nav-bar">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand >
                    <Link to="/"><img className="img-fluid" src={logo} alt="Logo"/></Link> 
                </Navbar.Brand>
              
                <Nav className="ml-auto">
                    <NavLink to='/' className="nav-link">Shop</NavLink>
                    <NavLink to='/orderriview' className="nav-link">Order Review</NavLink>
                    <NavLink to='/inventory' className="nav-link">Manage Inventory</NavLink>
                    <button className="btn btn-warning" onClick={() =>setLoggedInUser({})}>Sign Out</button>
                </Nav>

            </Navbar>
            
        </div>
    );
};

export default TopNavBar;