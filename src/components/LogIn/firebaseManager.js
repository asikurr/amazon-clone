import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const firebaseInnitializeLogin = () => { 
  if(firebase.apps.length === 0)  {
    firebase.initializeApp(firebaseConfig);
  }
   
}

export const googleHandleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const userInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
        }
       return userInfo;
        // console.log(res);

      })
      .catch(err => {
        console.log(err)
        console.log(err.code)
        console.log(err.message)
      }

      )

}

export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const userSignOut = {
          isSignedIn: false
        }
        return userSignOut
        // console.log(res);
      })
      .catch(err => console.log(err.message))
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          const newUser = res.user;
          newUser.error = '';
          newUser.success = true;
          updateUser(name)
          return newUser;
  

        })

        .catch(error => {
          const newUser = {};
          newUser.error = error.message
          newUser.success = false;
          return newUser

          // var errorMessage = error.message;
          // console.log(error.message)
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUser = res.user;
      newUser.error = '';
      newUser.success = true;
      return newUser;


    })
    .catch(error => {
      const newUser = {};
      newUser.error = error.message
      return newUser;
    });
}

const updateUser = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name

    }).then(res => {
      console.log('Updated profile successful')
    }).catch(error => {
      console.log('Updated profile faild', error)
    });
  }

