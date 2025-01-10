import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='max-w-xl mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-5'>Sign Up</h1>
      <form className='flex flex-col gap-5'>
        <input name='username' placeholder='username' id='username' className='border p-3 rounded-lg' />
        <input name='email' placeholder='email' id='password' className='border p-3 rounded-lg'/>
        <input name='password' placeholder='password' id='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:-85'>Sign Up</button>
      </form>
      <div className='flex my-5 gap-2'>
      <p>have an account?</p>
      <span className='text-slate-600'><Link to='/sign-in'>Sign in</Link></span>
      </div>
    </div>
  )
}
