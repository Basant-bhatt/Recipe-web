import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

function Contact() {
  const [name,setname]=useState("");
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_to0gxi5', 'template_jlst8ai', form.current, {
        publicKey: 'WU0MXO0nGH01YTVAO',
      })
      .then(
        () => {
          toast.success('Email sent Successfully');
        },
        (error) => {
          toast.error('FAILED...', error.text);
        },
      
      );
        setEmail("");
        setname("")
        setMessage("")
  };
  return (
    <div className='m-20'>
        <form className='flex flex-col max-w-100 mx-auto p-5 gap-5   rounded-2xl' ref={form} onSubmit={sendEmail}>
        <h1 className='text-[30px] font-bold   text-blue-900'>Contact us</h1>

        <input type="text" required placeholder='Name' name='name'  className='p-2 rounded-4xl border-2 border-blue-900 outline-none' value={name} onChange={(e)=>setname(e.target.value)}/>
        <input type="email"  placeholder='Email' name='your_email'  required className='p-2 rounded-4xl border-2 border-blue-900 outline-none' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <textarea placeholder='Message' required  className='p-2 rounded-lg border-2 border-blue-900 h-50 outline-none' name='message' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
        <button type='submit' className='p-2 rounded-2xl bg-blue-300 cursor-pointer'>Send Message</button>
        </form>
    </div>
  )
}

export default Contact