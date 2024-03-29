import React, { useContext, useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase_config";
import { db } from "../firebase_config";
import { updatePassword , updateEmail, updateProfile  } from "firebase/auth";
import { useRouter } from "next/dist/client/router";

const AuthContext = React.createContext('')

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const user =  auth.currentUser;
  var [loginErrMsg , setLoginErrMsg] = useState('');
  var [signUpErrMsg, setSignUpErrMsg] = useState('');
  var [updateUsernameErrMsg, setUpdateUsernameErrMsg] = useState('');
  const router = useRouter();
  function signup(email, password) {
 
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      if(user){
        router.push('/auth/UserDashboard');
        db.collection("users")
        .add({
          userID: user.uid,
          userEmail: email,
          userPassword: password,
        })
        .then(() => {
          // setUserEmail("");
          // setUserPassword("");
        })
        .catch((error) => {
          console.error(error);
        });
      }
      // ...
    })
    .catch((error) => {
      setSignUpErrMsg(error.message) ;
      console.log(error.message);
    });
  };

  function login(email, password) {
    signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;      
      console.log(user);         
    })
    .catch((error) => {
      setLoginErrMsg(error.message)
      console.log(error.message);
    });
  };

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }


  function updateUsername(name) {
    updateProfile(auth.currentUser, {
      displayName: name, 
      //photoURL: photoURL
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      setUpdateUsernameErrMsg(error.message)
      console.log(error.message);
    });
  }

  function updateUserEmail(email) {
    return updateEmail(auth.currentUser ,email)
  }

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user)  => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])


 

  const values = {
    currentUser,
    user,
    loginErrMsg,
    signUpErrMsg,
    updateUsernameErrMsg,
    login,
    signup,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    updateUsername,
  }

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  )
}