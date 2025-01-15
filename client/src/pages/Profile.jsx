import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {

  const { currentUser} = useSelector((state) => state.user);
  
  return (
    <div className='max-w-xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <img src={currentUser.image}  alt='profile'
         className='object-cover rounded-full h-24 w-24 self-center'/>
        <input type='text' placeholder='Username' className='p-3'/> 
        <input type='email' placeholder='Email' className='p-3'/> 
        <input type='password' placeholder='Password' className='p-3'/> 
        <button className='bg-green-700 text-white p-3 uppercase rounded-lg'>Update</button>
      </form>
      <div className='flex justify-between my-4'>
        <span className='text-red-700'>Delete account</span>
        <span className='text-red-700'>Sign out</span>
      </div>
    </div>
  )
}
