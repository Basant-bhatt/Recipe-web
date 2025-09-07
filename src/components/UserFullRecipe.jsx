import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deleteDoc, doc, getDoc, getFirestore } from 'firebase/firestore'
import { app } from '../firbase';

function UserFullRecipe() {
    const {id}=useParams()
    const navigate=useNavigate()

    const db=getFirestore(app)
      const [recipes,setRecipes]=useState([]);
      useEffect(()=>{
        const fetchRecipes=async()=>{
          const querySnapshot=await getDoc(doc(db,"recipes",`${id}`));
          setRecipes(querySnapshot.data());
        }
        fetchRecipes();
      },[])
      console.log(recipes)


       const handledelete=async ()=>{
          const deleteVal=doc(db,"recipes",id)
          await deleteDoc(deleteVal)
          
          navigate("/userRecipe")

        }
  return (
    <div className="flex justify-center relative">
      {recipes && (
        <div className=" mx-5 my-2 max-w-4xl">
          <h1 className="font-bold text-xl sm:text-3xl m-3 text-center ">{recipes.name}</h1>
          <div className=" flex flex-col w-fit items-end m-auto">
          <img
            src={recipes.coverPic}
            alt=""
            className="max-w-xs sm:max-w-xl mx-auto m-3"
          />
          
            {/* <i className={added?"fa-solid fa-heart text-red-600 cursor-pointer text-2xl":"fa-regular fa-heart cursor-pointer text-2xl"} onClick={()=>{setAdded(!added);addTofavorate(recipes)}} ></i> */}
            </div>
          
          <strong> Dish type : </strong>
          <p className="text-sm  text-gray-600 pb-2 inline-block">
            {recipes.type}
          </p>
          
          
          <br />
          <strong> Diets : </strong>
          <p className="text-sm  text-gray-600 pb-2 inline-block">
            {recipes.diets}
          </p>
          <br />
          <strong>Ingredients are used :</strong>
          
             <p className="text-xs sm:text-sm text-gray-600 pb-2">{recipes.ingredients}</p>
            
          <strong>Instructions :</strong>
          <p
            className="text-xs sm:text-sm text-gray-600 pb-2"
            
          >{recipes.instructions}</p>
          <strong>Summary : </strong>
          <p
            className="text-xs sm:text-sm text-gray-600 pb-2"
            
          >{recipes.summary}</p>

            <strong >Ready in : </strong>
          <p className="text-sm  text-gray-600 pb-2 inline-block">{recipes.ReadyTime} minutes</p>
          <br />
            <strong>Servings in : </strong>
          <p className="text-sm  text-gray-600 pb-2 inline-block">{recipes.servedTime} minutes</p>
          <div className='flex gap-10 justify-end'>
         <button className="cursor-pointer" onClick={()=>navigate(`/edit/${id}`,{state:recipes})}><i className="fa-solid fa-pencil text-sm pr-2 text-blue-700"></i>Edit</button> 
         <button className="cursor-pointer" onClick={handledelete}><i class="fa-solid fa-trash text-sm text-red-700 pr-2"></i>Delete</button> 
          </div>

        
        </div>
      )}
    </div>
    
  )
}

export default UserFullRecipe