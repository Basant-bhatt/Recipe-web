
import { Navigate, Route, Routes, useNavigate } from 'react-router'
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
import UserFullRecipe from './components/userFullRecipe'
import UpdateForm from './components/UpdateForm'

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
    <div>
    
     
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
      
        </div>
  
  
  )
}

export default App
  