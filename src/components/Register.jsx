
import React, {  useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, signInWithPopup,GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth';
import { app } from '../firbase';
import { Link } from 'react-router';


  const auth=getAuth(app)
  const googleProvider=new GoogleAuthProvider();



function Register() {
  
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const createUser=()=>{

    createUserWithEmailAndPassword(auth,email,password).then((item)=>alert("you are registerd")).catch((item)=>alert("this account already exsits"));

  }

  const loginWithGoogle=()=>{
    signInWithPopup(auth,googleProvider);
  }

  

    

  return (
    <div className='my-25'>
         <div className='flex flex-col max-w-100 mx-auto p-5 gap-5   rounded-2xl' >
        <h1 className='text-[30px] font-bold   text-blue-900'>Sign up</h1>

        {/* <input type="text" placeholder='Name' value={name} required className='p-2 rounded-4xl border-2 border-blue-900 outline-none' onChange={(e)=>setName(e.target.value)}/> */}
        <input type="email" placeholder='Email'  value={email} required className='p-2 rounded-4xl border-2 border-blue-900 outline-none' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="Password" placeholder='Password' value={password} required className='p-2 rounded-4xl border-2 border-blue-900 outline-none' onChange={(e)=>setPassword(e.target.value)}/>
        
        <button onClick={createUser} className='p-2 rounded-2xl bg-blue-300 cursor-pointer text-xl font-semibold'>Sign up</button>
      
          
          <p className=' text-sm text-gray-500 cursor-pointer' onClick={loginWithGoogle}>Signup with  <i className="fa-brands fa-google p-2 text-blue-700"  ></i></p>
          <p className='text-gray-500'>Already have an account ? <Link className='text-blue-800' to={"/login"}>Login</Link></p>
        
        </div>
        

       
       
        
    </div>
  ) 
}

export default Register