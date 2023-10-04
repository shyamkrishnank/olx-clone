import React from 'react';
import { useState,useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function Signup() {
  const navigate = useNavigate()
   const [username,setUsername] = useState('');
   const [email,setEmail] = useState('');
   const [phone,setPhone] = useState('');
   const [password,setPassword] = useState('');
   const handleSubmit =(e) =>{
    e.preventDefault()
    const auth = getAuth();
    const db = getFirestore();
      createUserWithEmailAndPassword(auth,email,password).then((result)=>{
        const user = result.user;
        updateProfile(user, {displayName:username})
        .then(()=>{
          const userCollection = collection(db, 'users');
          const userData ={
            id : user.uid,
            username:username,
            phone:phone,
          };
          addDoc(userCollection, userData)
          .then(()=>{
            navigate("/login");
          })
        })
    }
    )
    .catch(reson=>{
      // alert(reson)
      Swal.fire(reson.message)
    })
   }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={e=>setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={e=>setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
