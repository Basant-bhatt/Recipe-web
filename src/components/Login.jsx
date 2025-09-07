import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { app } from '../firbase'

const auth=getAuth(app)


function Login() {

   const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  const loginUser=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password);
  }
  
 
  return (
    <div className='my-25'>
    
           <div className='flex flex-col max-w-100 mx-auto p-5 gap-5   rounded-2xl' >
        <h1 className='text-[30px] font-bold   text-blue-900'>Login</h1>

        <input type="email" placeholder='Email'  value={email} required className='p-2 rounded-4xl border-2 border-blue-900 outline-none' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="Password" placeholder='Password' value={password} required className='p-2 rounded-4xl border-2 border-blue-900 outline-none' onChange={(e)=>setPassword(e.target.value)}/>
        
        <button onClick={loginUser} className='p-2 rounded-2xl bg-blue-300 cursor-pointer text-xl font-semibold' >Login</button>
        <p className='text-gray-500'>Don't have any account ? <Link className='text-blue-800' to={"/register"}>Register</Link> </p>
        </div>
        
    </div>
  )
}

export default Login