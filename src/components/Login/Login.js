import React, { useContext } from 'react';
import { useState } from 'react';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, initializeLoginFrameWork,handleSignOut, fbSignInHandle, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';




function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLoginFrameWork();

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

//handle Google Sign In
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res,true)
    })
  }
//Facebook Sign In
const fbSignIn = () =>{
  fbSignInHandle()
  .then(res => {
    handleResponse(res,true)
  })

}
// Handle SignOut
const signOut = () => {
  handleSignOut()
  .then(res => {
    handleResponse(res,false)
  })
}
  //Start Form Validation
  const handleOnBlur = (e) => {
    // console.log(e.target.name, e.target.value)
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.+\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasValid = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasValid;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  //End Form Validation



  const handleSubmit = (e) => {
    //create new user
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res=>{
        handleResponse(res,true)
      })
    }
    //for Sign In old user
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        handleResponse(res,true)
      })
    }
    e.preventDefault();
  }

  const handleResponse = (res,redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
  return (
    <div style={{textAlign:'center'}}>
      <p>Name : {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p>
      <p>Photo: <img src={user.photo} alt="" /></p>

      <button onClick={fbSignIn}>Sign In With Facebook</button>
    
      <br/>
      {
        user.isSignIn ? <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign With Google</button>
      }
      <h3>Form Validation With Own Authentication</h3>
      <input type="checkbox" name="newUser" id="" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">New user SignUp</label>
      <form onClick={handleSubmit}>
        {
          newUser &&
          <p>
            <label htmlFor="name">Name: </label>
            <input onBlur={handleOnBlur} type="text" name="name" id="" placeholder="Enter Your name" />
          </p>
        }
        <p>
          <label htmlFor="email">Email: </label>
          <input onBlur={handleOnBlur} type="text" name="email" id="" placeholder="Enter Your email" required />
        </p>
        <p>
          <label htmlFor="password">Password: </label>
          <input onBlur={handleOnBlur} type="text" name="password" id="" placeholder="Enter Your Password" required />
        </p>
        <input type="submit" value="Sign In" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success &&
        <p style={{ color: 'green' }}> User {newUser ? "Created " : "Logged In"} Successfully</p>
      }
    </div>
  );
}

export default Login;