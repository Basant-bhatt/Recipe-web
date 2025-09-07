import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function Favorite() {
  let [favorate,setFavotate]=useState([]);

  function updateFavorate(id){
    let updatelist=favorate.filter((item)=>item.id !== id)
    let updatefav=favorate.filter((item)=>item.id !== id)
    
    setFavotate(updatelist);
     localStorage.setItem("wishlist",JSON.stringify(updatelist));
     localStorage.setItem("fav",JSON.stringify(updatefav));
     
  }

  useEffect(()=>{
    const stored=localStorage.getItem("wishlist");
    if(stored){
      setFavotate(JSON.parse(stored))

    }
  },[]);
  return (
    
    <div className="m-2">
      
        <h1 className="text-center font-bold text-2xl p-5 text-blue-700">Your Favourite item's </h1>

        {
          favorate.length===0?(
            <p className=" text-xl text-gray-500 m-10">No favorite recipes</p>
          ):(
            favorate.map((item,index)=>(
              <div className="max-w-4xl h-30 sm:h-40 bg-gray-200 shadow-md  overflow-hidden  relative flex mb-5 mx-auto" key={index}>
        <img
          src={item.image}
          alt=""
          className="w-35 sm:w-55 "
          />
                <Link to={`/card/${item.id}`}>
        <div className="p-2">
          <h1 className="text-sm sm:text-lg font-bold p-1 ">{item.title}</h1>
          <p className="text-xs sm:text-sm text-gray-600 pb-1" dangerouslySetInnerHTML={{ __html: item.instructions||item.summary }}/>
           
          
        </div>
          </Link>
      <button className="absolute top-0 right-1 cursor-pointer text-xl  hover:bg-gray-300  rounded-full"  onClick={()=>updateFavorate(item.id)}>X</button>
      
      </div>
        ))
      )
      
  }
     
    </div>
     
  );
}

export default Favorite;
