"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


function page() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetail = async () => {

  }
  
  return (
    <div>page</div>
  )
}

export default page