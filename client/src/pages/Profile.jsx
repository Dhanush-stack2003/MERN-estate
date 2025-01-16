import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router-dom';
import { 
  updateUserStart,updateUserFailure,
  updateUserSuccess,deleteUserStart,deleteUserFailure
  ,deleteUserSuccess, 
  SignOutUserSuccess,
  SignOutUserStart} from '../redux/user/userSlice';

export default function Profile() {

  const { currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [update,setUpdated] = useState(false);
  const [error,setError] = useState(false)

  const formDataSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      setLoading(true)
      const updateUser = await fetch(`api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })

    const res = await updateUser.json();
    if(res.success === false){
      dispatch(updateUserFailure(res.message))
      setError(true)
    }
    dispatch(updateUserSuccess(res))
    setLoading(false)
  }catch(error){
    dispatch(updateUserFailure(error))
    setError(true)
  }
  }

  const formDataHandler = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const deleteHandler =async () => {
    try{
      dispatch(deleteUserStart())
    const user = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
      credentials:'include',
    })
    const res = await user.json();
    if(res.success === false){
      dispatch(deleteUserFailure(res.message))
    }
    dispatch(deleteUserSuccess(res))
  }catch(error){
    dispatch(deleteUserFailure(error))
  }}


  const signOutHandler =async () => {
    try{
    dispatch(SignOutUserStart())
    const user = await fetch('/api/auth/signout');
    const data = await user.json()
    if(data.success === false){
      SignOutUserFailure(data.message)
    }
    SignOutUserSuccess(data)
  }catch(error){
    dispatch(SignOutUserFailure(error))
  }
  }
  
  return (
    <div className='max-w-xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5' onClick={formDataSubmit}>
        <img src={currentUser.image}  alt='profile'
         className='object-cover rounded-full h-24 w-24 self-center'/>
        <input type='text' placeholder='Username' className='p-3'id='username' defaultValue={currentUser.username} onChange={formDataHandler}/> 
        <input type='email' placeholder='Email' className='p-3'id='email' defaultValue={currentUser.email} onChange={formDataHandler}/> 
        <input type='password' placeholder='Password' className='p-3' id='password' onChange={formDataHandler}/> 
        <button className='bg-green-700 text-white p-3 uppercase rounded-lg hover:opacity-90 disabled:opacity-65' onClick={()=>setUpdated(true)}>{loading ? 'Loading...' : 'Update' }</button>
      </form>
      <div className='flex justify-between my-4'>
        <span className='text-red-700 cursor-pointer' onClick={deleteHandler}>Delete account</span>
        <span className='text-red-700 cursor-pointer' onClick={signOutHandler}>Sign out</span>
      </div>
      <p className='text-red-700 my-5'>{error ? currentUser.message : ''}</p>
      <p className='text-green-700 my-5 '>{!error && update ? 'changes updated'  : ''}</p>
    </div>
  )
}
