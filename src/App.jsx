import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/profile'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='sign-in' element={<SignIn/>}/>
      <Route path='sign-up' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}
