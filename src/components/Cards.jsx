import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function Cards() {
  let { id } = useParams();
  let [cards, setCard] = useState();
  let Api_key = "7e8badff25b34a4782b9dca18b08a0ce";
  let Url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${Api_key}`;
  // let [added,setAdded]=useState(false);
  // let [favorate,setFavotate]=useState([]);
  // let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];
 

  useEffect(() => {
    carditem();
  }, [id]);

  async function carditem() {
    let response = await fetch(Url);
    let promise = await response.json();
    setCard(promise);
    console.log(promise);
  }


  // function addTofavorate(item){   
  //   if(favorate.find(fav=>fav.id===item.id)){ 
  //     console.log(item.dishTypes)
      
  //     setFavotate(favorate.filter(fav=>fav.id!==item.id))   
  //       localStorage.setItem("wishlist",JSON.stringify(favorate.filter(fav=>fav.id!==item.id)));    

      

  // }
  //   else{
  //     let updatedFavorate=[...wishlist,item]
  //     setFavotate([...favorate,item]);
      
  //       localStorage.setItem("wishlist",JSON.stringify(updatedFavorate));    
        
  //   }
  // }

  //  useEffect(()=>{
  //   const savedFavorate=JSON.parse(localStorage.getItem("fav"));
  //   if(savedFavorate){
  //     setFavotate(savedFavorate)
  //   }
  // },[])

  
  // useEffect(()=>{
  //   localStorage.setItem("fav",JSON.stringify(favorate));
  // },[favorate])
  return (
    <div className="flex justify-center relative">
      {cards && (
        <div className=" mx-5 my-2 max-w-4xl">
          <h1 className="font-bold text-xl sm:text-3xl m-3 text-center">{cards.title}</h1>
          <div className=" flex flex-col w-fit items-end m-auto">
          <img
            src={cards.image}
            alt=""
            className="max-w-xs sm:max-w-xl mx-auto m-3"
          />
          
            {/* <i className={added?"fa-solid fa-heart text-red-600 cursor-pointer text-2xl":"fa-regular fa-heart cursor-pointer text-2xl"} onClick={()=>{setAdded(!added);addTofavorate(cards)}} ></i> */}
            </div>
          
          <strong> Dish type : </strong>
          <p className="text-sm  text-gray-600 pb-2 inline-block">
            {cards.dishTypes.join(" , ")}
          </p>
          
          
          <br />
          <strong> Diets : </strong>
          <p className="text-sm  text-gray-600 pb-2 inline-block">
            {cards.diets.join(" , ")}
          </p>
          <br />
          <strong>Ingredients are used :</strong>
          <ul>
            {cards.extendedIngredients?.map((ingre, index) => (
              <li key={index} className="text-sm  text-gray-600  ">
                • {ingre.amount} {ingre.unit} {ingre.name}
              </li>
            ))}
          </ul>
          <strong>Instructions :</strong>
          <p
            className="text-xs sm:text-sm text-gray-600 pb-2"
            dangerouslySetInnerHTML={{ __html: cards.instructions }}
          />
          <strong>Summary : </strong>
          <p
            className="text-xs sm:text-sm text-gray-600 pb-2"
            dangerouslySetInnerHTML={{ __html: cards.summary }}
          />

            <strong >Ready in : </strong>
          <p className="text-sm  text-gray-600 pb-2 inline-block">{cards.readyInMinutes} minutes</p>
          <br />
            <strong>Servings in : </strong>
          <p className="text-sm  text-gray-600 pb-2 inline-block">{cards.servings} minutes</p>


          <p>
            <strong>Credit : </strong>
            <a href={cards.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-900" >
              {cards.creditText||"View resouces"}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Cards;
