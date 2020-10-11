import React,{ useState, createContext} from 'react';
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
import LogIn from './components/LogIn/LogIn'
import Shipment from './components/Shipment/Shipment'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ManageInventory from './components/ManageInventory/ManageInventory';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const userContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})


  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    {/* {loggedInUser.email} */}
      <Router>
          <TopNavBar/>
        <Switch>
        
        <Route path="/home">
           <Home/>
        </Route>
        <Route exact path="/">
           <Home/>
        </Route>
        <Route exact path="/login">
           <LogIn/>
        </Route>
        <PrivateRoute exact path="/shipment">
           <Shipment/>
        </PrivateRoute>
        <PrivateRoute exact path="/inventory">
           <ManageInventory/>
        </PrivateRoute>
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
    </userContext.Provider>
  );
}

export default App;
