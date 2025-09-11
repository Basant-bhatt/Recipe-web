
import { getAuth, signOut } from 'firebase/auth'
import {  useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { app } from '../firbase'
import { toast } from 'react-toastify'

const auth = getAuth(app)


function Navbar({ islogin }) {

  const [isopen, setOpen] = useState(false)
  const [show, setShow] = useState(false)

  let [inputItem, setinputItem] = useState();
  let navigate = useNavigate()
  let togglesidebar = () => {
    setOpen(!isopen)
  }

  

  let closenav = () => {
    setOpen(!isopen)
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${inputItem}`)


    setinputItem("")
  }

  const logout = () => {
    signOut(auth).then((item) => toast.info(islogin.email + "you are logeed out") );
  }


  const popupRef = useRef(null);

  // Close popup if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className=' sticky top-0  z-50'>

    <div className='  bg-gray-200  sm:px-5 px-2 flex justify-around items-center text-blue-700 relative mb-3' >
     

      <Link to={"/"} className='font-bold text-lg sm:text-xl cursor-pointer'>Tasty_Bites</Link >
      <div className="navPages sm:flex gap-3 sm:gap-8 text-[18px]   cursor-pointer  hidden ">
        <Link to={"/"}  onClick={(e)=>{e.preventDefault();window.location.href="/"}} >Home</Link>
        <Link to={"/contact"}>Contact us</Link>
      </div>
      <form action="" onSubmit={handlesubmit} className=''>

        <label className='bg-white px-2 py-1 rounded-2xl cursor-pointer w-full '>
          <input type="text" className=' outline-none mx-1  text-sm  ' value={inputItem} placeholder='Search here...' onChange={(e) => setinputItem(e.target.value)} />
          <i className="fa-solid fa-magnifying-glass"></i>
        </label>
      </form>

      <div className=' sm:hidden ' onClick={togglesidebar}>
        <i className="fa-solid fa-bars cursor-pointer text-2xl p-4 "></i>


      </div>

      <div className="icons sm:flex  gap-3 items-center hidden text-xl  ">

        <Link to={"/favorite"} ><i className="fa-regular fa-heart cursor-pointer"></i></Link>

        {islogin ?
          <div className='p-4 ' ref={popupRef}>
            <i className="fa-regular fa-user cursor-pointer " onClick={() => setShow(!show)}></i>

            {
              show &&
              <div className='text-sm cursor-pointer absolute z-10 top-16 right-10 space-y-3 bg-gray-200 py-4 px-3 text-center'>
                <div className=' flex items-center'>
                  <i class="fa-solid fa-circle-user mr-1 text-4xl"></i>

                  <p className='text-xs'> {islogin.email}</p>
                </div>
                <div className='flex gap-3'>
                  <Link to={"/addRecipe"} className=' hover:underline' onClick={()=>setShow(!show)}><i className="fa-solid fa-plus mr-1"></i>Add Recipes</Link>
                  <Link to={"/userRecipe"} className=' hover:underline' onClick={()=>setShow(!show)}><i className="fa-regular fa-face-smile mr-1"></i>My Recpies</Link>
                </div>

                <p className=' hover:underline' onClick={()=>{
                  logout();
                  setShow(!show);
                  navigate("/")
                  }}><i className="fa-solid fa-arrow-right-from-bracket mr-1"></i>Logout </p>

              </div>
            }

          </div>


          :
          <Link to={"/login"} className='p-4'>

            <i className="fa-regular fa-user cursor-pointer " ></i>
          </Link>



        }
      </div>





      {isopen &&
        <div className='bg-black inset-0 fixed bg-opacity-40  z-40 sm:hidden' onClick={closenav}></div>
      }

      <div className={`fixed top-0 left-0 h-full w-64  bg-gray-300 z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${isopen ? 'translate-x-0' : '-translate-x-full'
        }`}>

        <div className='my-5 mx-2 flex items-center '>
          <i className="fa-solid fa-circle-user text-4xl"></i>
          <div className='space-y-1'>
            <p className='text-xs ml-2'>{islogin ? `${islogin.email}` : "No user"}</p>
            {islogin?

              <div className='flex gap-3 text-xs'>
              <Link to={"/addRecipe"} className=' hover:underline' onClick={closenav}><i className="fa-solid fa-plus mr-1"></i>Add Recipes</Link>
              <Link to={"/userRecipe"} className=' hover:underline' onClick={closenav}><i className="fa-regular fa-face-smile mr-1"></i>My Recpies</Link>
            </div>:<Link className='text-xs ml-1' to={"/login"} onClick={closenav}>Sign up/Log In</Link>
            }
          </div>
        </div>

        <div className={`flex flex-col gap-4 m-5`}>
          <Link to={"/"} onClick={closenav}><i className="fa-regular fa-home cursor-pointer mr-1 "></i > Home</Link>
          <Link to={"/favorite"} onClick={closenav}><i className="fa-regular fa-heart cursor-pointer mr-1"></i> Wishlist</Link>
          <Link to={"/contact"} onClick={closenav}><i className="fa-regular fa-address-book cursor-pointer mr-1"></i>Contact us</Link>
          {

            islogin ?
              <p onClick={() => {
                logout();
                closenav();
              }} className='cursor-pointer'>
                <i className="fa-solid fa-arrow-right-from-bracket mr-1 "></i>
                Logout from Tasty_Bites
              </p> :
              <Link to={"/login"} onClick={closenav}><i className="fa-regular fa-user cursor-pointer mr-1 "></i>Sign up/Log In</Link>
          }
        </div>
        <h1 className='font-bold text-xl sm:text-2xl m-4 absolute  bottom-0'>Tasty_Bites</h1>
      </div>

    </div>
              </div>
  )
}

export default Navbar;


