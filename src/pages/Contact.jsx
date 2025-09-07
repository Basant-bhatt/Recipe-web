import React from 'react'

function Contact() {
  return (
    <div className='m-20'>
        <form className='flex flex-col max-w-100 mx-auto p-5 gap-5   rounded-2xl' >
        <h1 className='text-[30px] font-bold   text-blue-900'>Contact us</h1>

        <input type="text" placeholder='Name' required className='p-2 rounded-4xl border-2 border-blue-900 outline-none'/>
        <input type="email" placeholder='Email'  required className='p-2 rounded-4xl border-2 border-blue-900 outline-none'/>
        <textarea placeholder='Message' className='p-2 rounded-lg border-2 border-blue-900 h-50 outline-none'></textarea>
        <button type='submit' className='p-2 rounded-2xl bg-blue-300 cursor-pointer'>Send Message</button>
        </form>
    </div>
  )
}

export default Contact