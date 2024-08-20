"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'


export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetail = async () => {
    try {
        const res = await axios.get("/api/users/me")
        // console.log(res.data)
        setData(res.data.data._id)
        toast.success("Got the details")

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successfull')
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
        <h2 className=' bg-rose-200 border-2 px-12 font-bold py-3 rounded-lg m-2 border-rose-300 '>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2> 
      <hr />
      <button
      className='bg-blue-500 mt-6 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded'
      onClick={logout}
      >logout
      <Toaster />
      </button>
      <button
      className='bg-green-500 mt-6 hover:bg-green-700 text-white font-bold py-3 px-8 rounded'
      onClick={getUserDetail}
      >getUser-Details
      <Toaster />
      </button>
    </div>
  )
}