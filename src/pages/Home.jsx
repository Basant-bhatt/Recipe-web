import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function Home() {
   const category=["vegan","non-vegetarian","vegetarian",]
  let Api_key="7e8badff25b34a4782b9dca18b08a0ce";
  let Url=`https://api.spoonacular.com/recipes/random?number=10&apiKey=${Api_key}`;
  const [categoryValue,setCategoryValue]=useState("");
  const categoryApi=`https://api.spoonacular.com/recipes/complexSearch?diet=${categoryValue}&addRecipeInformation=true&apiKey=${Api_key}`;
  
  let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];
  let [recipe,setRecipe]=useState([]);
  let [favorate,setFavotate]=useState([]);

  useEffect(()=>{
    const savedfav=JSON.parse(localStorage.getItem("fav"));
    if(savedfav){
      setFavotate(savedfav)
    }
  },[])
 


  useEffect(()=>{
    localStorage.setItem("fav",JSON.stringify(favorate));

  },[favorate])
  
async function getcategorywise(){
  let item=await fetch(categoryApi);
  let data=await item.json();
  setRecipe(data.results)
}

  function addTofavorate(item){   
    // const isfav=favorate.some((i)=>i.id===item.id)
    if(favorate.find(fav=>fav.id===item.id)){ 
     console.log(item)
      
      setFavotate(favorate.filter(fav=>fav.id!==item.id))   
        localStorage.setItem("wishlist",JSON.stringify(favorate.filter(fav=>fav.id!==item.id)));    
  }
    else{
      let updatedFavorate=[...wishlist,item]
      setFavotate([...favorate,item]);
      

        localStorage.setItem("wishlist",JSON.stringify(updatedFavorate));    
        
    }
  }

  async function  gettingdata (){  
      let response=await fetch(Url);
      let promise=await response.json();  
      setRecipe(promise.recipes);   
      console.log(promise.recipes)    
  }  

  useEffect(()=>{
    getcategorywise()
  },[categoryValue])

  useEffect(()=>{
    gettingdata();   
      },[]) 


      useEffect(()=>{
        const saved=JSON.parse(localStorage.getItem("wishlist"));
        if(saved){
          setFavotate(saved)
        }
      },[])
  return (
    <div className="m-5">  
      <div className="flex gap-5 justify-center m-5 ">
     {
      category.map((i,index)=>(
      <button key={index} className="text-blue-700 text-lg cursor-pointer rounded-2xl px-2 py-1 hover:bg-gray-300 " value={i} onClick={(e)=>setCategoryValue(e.target.value)} >{i}</button>
      ))
    }
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5  max-w-fit mx-auto "   >
      {
        recipe&&recipe.map((item,index)=>(
          <div className="max-w-[250px]  bg-gray-200 shadow-md rounded-lg overflow-hidden h-80 hover:shadow-neutral-500 relative" key={index}>
          <i className={favorate.find(fav=>fav.id===item.id)?"fa-solid fa-heart text-red-600 p-1 cursor-pointer":"fa-regular fa-heart cursor-pointer p-1"} onClick={()=>addTofavorate(item)}></i>
          <img
            src={item.image}
            alt=""  
            className="w-full h-40 "
            />
          <div className="p-2">
            <h1 className="text-sm font-bold mb-1">{item.title}</h1>
            <p
            className="text-xs sm:text-sm text-gray-600 pb-2"
            dangerouslySetInnerHTML={{ __html: item.instructions||item.summary }}
          />
          </div>
          <Link  to={`/card/${item.id}`}>
          <button className=" absolute bottom-0 bg-blue-300 w-full p-2 cursor-pointer">    
            See more
          </button>
            </Link>
        </div>
      ))}
    </div>     
    </div>
  );}

export default Home;
