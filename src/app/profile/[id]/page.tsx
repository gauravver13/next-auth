import React from 'react'

export default function page({params}: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className=' bg-red-200 rounded p-3 border-2 font-semibold text-red-500 border-red-300'>Profile Page</h1>
        <h2 className='p-3 mt-8 bg-green-400  border-2 font-bold border-green-500 rounded text-black'>{params.id}</h2>
    </div>
  )
} 