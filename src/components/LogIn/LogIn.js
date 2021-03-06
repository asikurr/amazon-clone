import React, { useState, useContext } from 'react';

import { userContext } from '../../App';
import { useLocation, useHistory } from 'react-router-dom';
import { firebaseInnitializeLogin, googleHandleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, resetPassword } from './firebaseManager';


function LogIn() {


  const [isNewUser, setIsNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  firebaseInnitializeLogin();


  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const location = useLocation();
  const history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res)
    if (redirect) {
      history.replace(from)
    }

  }

  const HandlegoogleSignIn = () => {
    googleHandleSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }
  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false)
      })
  }


  const handleChange = (e) => {
    // console.log(e.target.name,  e.target.value)
    let isFormValid = true;
    if (e.target.name === 'name') {
      isFormValid = e.target.value.length > 4
      //  console.log(isFormValid);
    }

    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
      // console.log(isEmailValid);
    }

    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordContainNumber = /\d{1}/.test(e.target.value)
      isFormValid = isPasswordValid && passwordContainNumber
      console.log(isPasswordValid, passwordContainNumber)
    }

    if (isFormValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);

    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    // console.log(user.email , user.password)
    if (isNewUser && user.email && user.password) {
      // debugger
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }

    if (!isNewUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }

    e.preventDefault();

  }


  return (

    <div className="container">
      <div className="row justify-content-md-center">
        <div style={{ textAlign: 'center' }} col-md={6}>
          {
            user.isSignedIn ? <button className="btn btn-outline-warning my-1" onClick={signOut}>Sign Out</button> :
              <button className="btn btn-outline-primary my-1" onClick={HandlegoogleSignIn}>Sign In With Google</button>
          }


          {
            user.isSignedIn && (
              <div>
                <h4>Name is : {user.name}</h4>
                <p>Email is : {user.email}</p>
                <img src={user.photo} alt="user img" />
              </div>
            )
          }

          <h1>Our Own Authentication</h1>
          {/* <p>Name is : {user.name}</p>
      <p>Email is : {user.email}</p>
      <p>Password is : {user.password}</p> */}
          <p style={{ color: 'red' }}>{user.error}</p>
          {
            user.success && <p style={{ color: 'green' }}>Account {isNewUser ? 'Create' : 'Login'} Successfully</p>

          }
          <input type="checkbox" onClick={() => setIsNewUser(!isNewUser)} name="isNewUser" id="" />
          <label htmlFor="isNewUser">New User SignUp</label>
          <form onSubmit={handleSubmit} className="form-group" >
            {
              isNewUser && <input className="form-control" type="text" name="name" onBlur={handleChange} placeholder="Name" id="name" required />
            }
            <br />
            <input className="form-control" type="text" name="email" onBlur={handleChange} placeholder="Email" id="email" required /><br />
            <input className="form-control" type="password" name="password" onBlur={handleChange} placeholder="Password" id="password" required /><br />

            {
              isNewUser ? <input className="btn btn-outline-primary" type="submit" value="Sign Up" /> : <input type="submit" className="btn btn-primary" value="Log In" />
            }



          </form>
           <button onClick={() => resetPassword(user.email) }className="btn btn-warning">Forget Password</button>

        </div>

      </div>
    </div>

  );
}

export default LogIn;
