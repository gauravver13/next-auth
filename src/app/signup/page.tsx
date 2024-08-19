"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

export default function SignupPage() {

  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false)


  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user )
      console.log('Signup success', response.data);
      router.push('/login')

    } catch (error: any) {
        console.log('Signup failed');
        toast.error(error.message);
    }
  }

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0 && user.username.length>0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div className="signup flex bg-slate-950 flex-col p-10 rounded-xl justify-center h-auto border-2 border-rose-300">
            <h1 className=' text-4xl m-5 font-bold items-center'>{loading ? "Processing": "Signup"}
            </h1>

          <label htmlFor="username" className='font-normal mb-1 items-start'>username</label>
          <input
          id='username'
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})} 
          placeholder='username'
          className='font-medium m-auto p-1 rounded-md border-none text-blue-500'
          type="text" />

          <label htmlFor="email" className='font-normal mb-1 mt-3 items-start'>email</label>
          <input 
          id='email'
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder='email'
          className='font-medium m-auto p-1 rounded-md border-none text-blue-500'
          type="text" 
          />

          <label htmlFor="password" className='font-normal mb-1 mt-3 items-start'>password</label>
          <input 
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder='password'
          type="password" name="password" className='font-medium m-auto p-1 rounded-md border-none text-blue-500' id="password" />
          <button
                  onClick={onSignup}
                  className='p-4 bg-blue-600 hover:bg-blue-800 mt-6 rounded-lg mb-4 font-bold'
                  >
                  {buttonDisabled? "Please fill the details": "Signup"}
          </button>

          <Link href='/login' className='items-start text-blue-400 -mt-3 text-wrap'>already Signup? Login</Link>
        </div>
    </div>
  )
}

 