
import React, { useState } from 'react'
import { app } from '../firbase'
import { addDoc, collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useLocation, useNavigate, useParams } from 'react-router'


function UpdateForm() {
    const {id}=useParams()
    console.log(id)
    const navigate=useNavigate()
   // const [coverPic,setCoverPic]=useState("")
   const location=useLocation()
   console.log(location)
       const [coverPic,setCoverPic]=useState(location.state.coverPic)
      const [name,setName]=useState(location.state.name)
      const [type,setType]=useState(location.state.type)
      const [diets,setDiets]=useState(location.state.diets)
      const [ingredients,setIngredients]=useState(location.state.ingredients)
      const [instructions,setInstructions]=useState(location.state.instructions)
      const [summary,setSummary]=useState(location.state.summary)
      const [ReadyTime,setReadyTime]=useState(location.state.ReadyTime)
      const [servedTime,setServedTime]=useState(location.state.servedTime)
    
      const db=getFirestore(app);

        const uploadImage=async(event)=>{
    const file=event.target.files[0];
    if(!file) return;
    const data=new FormData();
    data.append("file",file)
    data.append("upload_preset","Recipe_web")
    // data.append("cloud_name","dp10gg7up")

   const res= await fetch(" https://api.cloudinary.com/v1_1/dp10gg7up/image/upload",
    {
      method:"POST",
      body:data,
    })

    const uploadedImage=await res.json()

    console.log(uploadedImage.url);
    setCoverPic(uploadedImage.url)
  }
    
      const updateData= async(e) =>{  
        e.preventDefault();
        const docRef=doc(db,"recipes",`${id}`)
        await updateDoc(docRef,{
            coverPic,
            name,
            type,
            diets,
            ingredients,
            instructions,
            summary,
            ReadyTime,
            servedTime,
        }
    )
    navigate(`/recipe/${id}`)
      }
    
      return (
       
        <div className='flex flex-col items-center p-5'>
        <h1 className='text-2xl font-bold mb-8 text-blue-700 text-center'>Add your own recipe</h1>
          
       <form action="" onSubmit={updateData} >
         <div className=' flex flex-col  items-center gap-5 bg-gray-200 w-full max-w-2xl rounded-4xl shadow-2xl p-8 mb-10'>
            
    
            <label className='w-full max-w-30 h-30 rounded-full cursor-pointert  relative bg-white cursor-pointer'>
          <img src={coverPic} alt=""  className=' w-full  h-full rounded-full cursor-pointer '/>
          <input type='file'  className=' w-full max-w-30 h-30 rounded-full cursor-pointer text-xs hidden'  onChange={uploadImage} />
        <i className="fa-solid fa-circle-plus text-gray-500 text-2xl absolute right-3 bottom-1  cursor-pointer"></i>
        </label>
            <div className='flex flex-col gap-5 cursor-pointer '>
              <label className=''>
              Recipe name :
           <input type="text"  placeholder='type here ...' className='outline-none  rounded-2xl p-5 h-8 w-full  border-b-2 ' value={name} onChange={(e)=>setName(e.target.value)} required/>
              </label>
              <label>
              Recipe type : 
            <input type="text" placeholder='Ex - desert,breakfast' className='outline-none  rounded-2xl p-5 h-8 w-full max-w-sm border-b-2' value={type} onChange={(e)=>setType(e.target.value)}/>
              </label>
    
              <label htmlFor="">
               Recipe Diets : 
            <input type="text" placeholder='Ex - vegetarian,dairy free' className='outline-none bg-gray-200 rounded-2xl p-5 h-8 w-full max-w-sm border-b-2' value={diets} onChange={(e)=>setDiets(e.target.value)}/>
              </label>
    
              <label htmlFor="">
              Ingredients are used :
            <input type="text" placeholder='Ex - milk,egg,rice' className='outline-none bg-gray-200 rounded-2xl p-5 h-8 w-full max-w-sm border-b-2' value={ingredients} onChange={(e)=>setIngredients(e.target.value)} required/>
              </label>
              <label htmlFor="">
              Instructions for recipe :
            <textarea type="text" className='outline-none bg-gray-200 rounded-lg p-5  w-full max-w-sm border-b-2 border-r-2' placeholder='write instructions here ...' value={instructions} onChange={(e)=>setInstructions(e.target.value)} required></textarea>
              </label>
              <label htmlFor="">
              Recipe summry :
              <textarea type="text" className='outline-none bg-gray-200 rounded-lg p-5  w-full max-w-sm border-b-2 border-r-2 ' placeholder='write summary here ...' value={summary} onChange={(e)=>setSummary(e.target.value)}></textarea>
              </  label>
              <label htmlFor="">
                Ready in min :
            <input type="number" className='outline-none bg-gray-200 rounded-2xl p-5 h-8 w-full max-w-sm border-b-2' placeholder='Ex - 50 min' value={ReadyTime} onChange={(e)=>setReadyTime(e.target.value)}/>
              </label>
              <label htmlFor="">
                Served in min :
            <input type="number" className='outline-none bg-gray-200 rounded-2xl p-5 h-8 w-full max-w-sm border-b-2' placeholder='2 min' value={servedTime} onChange={(e)=>setServedTime(e.target.value)}/>
              </label>
            </div>
              <button className='m-5 bg-gray-300  rounded-3xl  text-blue-800 cursor-pointer 00 py-2.5 px-3 hover:bg-gray-400' type='submit'>Edit Recipe</button>
            
       
        </div>
       </form>
        </div>
      
      )
    }
  


export default UpdateForm