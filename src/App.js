import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from './components/TopNavBar/TopNavBar';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './components/404/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import OrderReview from './components/orderReview/OrderReview';

function App() {
  return (
    <Router>
          <TopNavBar/>
        <Switch>
        
        <Route path="/home">
           <Home/>
        </Route>
        <Route exact path="/">
           <Home/>
        </Route>
        <Route exact path="/orderriview">
           <OrderReview/>
        </Route>
        <Route exact path="/details/:productId">
           <ProductDetails/>       
       </Route>
        <Route path="*">
           <NotFound/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
