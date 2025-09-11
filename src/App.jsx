
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router'
import './App.css'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './components/Login'
import Register from './components/Register'
import Favorite from './pages/Favorite'
import Cards from './components/Cards'
import { useEffect, useState } from 'react'
import Recipes from './pages/Recipes'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from './firbase'
import UserRecipe from './pages/UserRecipe'
import AddRecipe from './pages/AddRecipe'
import UserFullRecipe from './components/UserFullRecipe'
import UpdateForm from './components/UpdateForm'
import { ToastContainer } from 'react-toastify'

 const auth=getAuth(app)

function App() {
  const [islogin,setIsLogin]=useState("")
   
    
   const navigate=useNavigate();


  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        navigate("/");
        setIsLogin(user)
       
      }else{
        setIsLogin(null);
        console.log("ll")
      }
    })
  },[])

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow'>

      <ToastContainer position='top-right' />
     
       <Navbar islogin={islogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/userRecipe' element={<UserRecipe/>}/>
        <Route path='/addRecipe' element={<AddRecipe/>}/>
        <Route path='/card/:id' element={<Cards/>}/>
        <Route path='/recipe/:id' element={<UserFullRecipe/>}/>
        <Route path='/search/:name' element={<Recipes/>}/>  
        <Route path='/edit/:id' element={<UpdateForm/>}/>  

        
        
        </Routes>
      </main>

        <footer className='flex gap-3  justify-around  items-center bg-gray-200 py-3 px-1 mt-10 '>
          
        {/* left section  */}

        <div>
          <Link to={"/"} className='font-bold text-sm sm:text-lg cursor-pointer text-gray-700'>Tasty_Bites</Link >
          <p className='text-gray-400 text-xs sm:text-sm '>&copy; {new Date().getFullYear()}Recipe Web. All rights reserved</p>
        </div>

        {/* center section */}

        <div className='flex flex-col cursor-pointer  text-xs sm:text-sm space-y-1'>
          <Link to={"/"} className='hover:underline'>Home</Link>
          <Link to={"/contact"} className='hover:underline'>Contact</Link>
          <Link to={"/favorite"} className='hover:underline'>Favorite</Link>
        
        </div>

        {/* right section  */}

        <div className=' sm:text-2xl space-x-1 sm:space-x-4 '>
          <Link to={"https://www.instagram.com/basantbhatt000/"}><i className='fab fa-instagram text-pink-600'></i></Link>
          <Link to={"https://www.linkedin.com/in/basant-bhatt-3a3ba6319/"}><i className='fab fa-linkedin text-blue-700' ></i></Link>
          <Link to={"https://github.com/Basant-bhatt/Recipe-web"}><i className='fab fa-github'></i></Link>
          <Link to={'https://x.com/Basantbhatt00'}><i class="fa-brands fa-x-twitter"></i></Link>
          
        </div>
            
          
        </footer>
      
        </div>
  
  
  )
}

export default App
  