import React from 'react'
import {FaSearch} from 'react-icons/fa'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between p-3 max-w-6xl mx-auto'>
            <h1 className='flex items-center'>
                <span className='text-slate-700 font-bold text-3xl'>Aura</span>
                <span className='text-slate-400 font-bold text-3xl'>Estates</span>
            </h1>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='search' placeholder='search...' className='focus:outline-none  w-24 sm:w-64 bg-transparent'/>
                <FaSearch/>
            </form>
            <ul className='flex items-center gap-3'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Profile</li>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                <li className='text-slate-700 hover:underline'>SignIn</li>
            </ul>
        </div>
    </header>
  )
}
