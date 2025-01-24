import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/Profile'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Header from './components/Header'
import PrivateProfile from './components/auth/privateProfile'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'

export default function App() {
  return (
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route element={<PrivateProfile/>}>
       <Route path='/create-list' element={<CreateListing/>}/>
       <Route path='/update-list/:ListingId' element={<UpdateListing/>}/>
       <Route path='/profile' element={<Profile/>}/>
      </Route>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}
