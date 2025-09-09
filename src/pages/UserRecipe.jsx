import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../firbase";
import { Link } from "react-router";
import { getAuth } from "firebase/auth";

 function  UserRecipe() {
const db=getFirestore(app)
  const [recipes,setRecipes]=useState([]);

  useEffect(()=>{
    const theData=async () =>{
       const auth=getAuth(app)
  const user=auth.currentUser;
  if(!user) return ;

  const q=query(
    collection(db,"recipes"),
    where("userid","==",user.uid)
  )

  const querySnapshot= await getDocs(q);
  setRecipes( querySnapshot.docs.map(doc=>({
    id:doc.id,
    ...doc.data(),
  })));
    };
    theData();
  },[]);

  // useEffect(()=>{
  //   const fetchRecipes=async()=>{
  //     const querySnapshot=await getDocs(collection(db,"recipes"));
  //     const recipesList=querySnapshot.docs.map((doc)=>({
  //       id:doc.id,...doc.data(),
  //     }));
  //     setRecipes(recipesList)
  //   };
  //   fetchRecipes();
  //   console.log(recipes)
  // },[]) 
   const handledelete=async (id)=>{
    const deleteVal=doc(db,"recipes",id)
    await deleteDoc(deleteVal)
    setRecipes((prev)=>prev.filter((recipe)=>recipe.id!==id))
  }
  
  return (
    <div className="m-5">
      
      <h1 className="text-2xl font-bold text-blue-700 text-center p-5">My recipes</h1>

      {
        recipes.length===0?
          <h1 className=" text-xl text-gray-500 m-10">No Recipes yet. Add your first recipe</h1>
        :
        

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5  max-w-fit mx-auto relative">

          
      {
        recipes.map((recipe,index)=>(

        <div className="w-xs max-w-full bg-gray-200 shadow-md rounded-lg overflow-hidden h-80 hover:shadow-neutral-500 relative " key={index}>
          <div>
          
          <i className="fa-solid fa-circle-xmark absolute text-2xl top-2 left-1 cursor-pointer text-gray-500" onClick={()=>handledelete(recipe.id)}></i>          
          <img src={recipe.coverPic} alt="" className="w-full h-40 " />
          <div className="p-2">
            <h1 className="text-sm font-bold mb-1">
             {recipe.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 pb-2 ">
             {recipe.instructions}
            </p>
          </div>
          </div>
          
          
          {/* <button className="cursor-pointer"><i className="fa-solid fa-pencil text-sm pr-2"></i>Edit</button> */}
           <Link to={`/recipe/${recipe.id}`}>
           <button className=" cursor-pointer hover:underline absolute bottom-0 bg-blue-300 w-full p-2 text-center ">See more</button>  
           </Link>
           
           </div>
          )
        )
      }
    
    </div>
        }
    </div>
  );
}

export default UserRecipe;
