import React, { useState,useContext } from 'react';
import {FirebaseContext} from  '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const [password,setPassword] = useState('')
  const handleLogin = e =>{
    e.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      alert('Logged In')
      navigate('/')
    }).catch((error)=>{
      alert(error.message)
    })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
          value={password}
          onChange={e=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
