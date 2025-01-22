import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {  Link, useNavigate } from 'react-router-dom';
import { 
  updateUserStart,updateUserFailure,
  updateUserSuccess,deleteUserStart,deleteUserFailure
  ,deleteUserSuccess, 
  SignOutUserSuccess,
  SignOutUserStart} from '../redux/user/userSlice';

export default function Profile() {

  const { currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [update,setUpdated] = useState(false);
  const [error,setError] = useState(false);
  const [showListing,setShowListing] = useState([]);
  const [listingError,setListingError] = useState(false);

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
  }}


  const handleUserListing = async () => {
    setListingError(false);
    try {
      const GetListing = await fetch(
        `/api/list/listing/${currentUser._id}`,
        {
          method: "GET",
        }
      );
      const data = await GetListing.json();
      if(data.success === false){
        setListingError(data.message)
        return
      }
       setShowListing(data)
      console.log(data)
      console.log(showListing)
    } catch (error) {
      setListingError(true);
      console.log(error)
    }
  }
  
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={formDataSubmit}>
        <img
          src={currentUser.image}
          alt="profile"
          className="object-cover rounded-full h-24 w-24 self-center"
        />
        <input
          type="text"
          placeholder="Username"
          className="p-3"
          id="username"
          defaultValue={currentUser.username}
          onChange={formDataHandler}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3"
          id="email"
          defaultValue={currentUser.email}
          onChange={formDataHandler}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3"
          id="password"
          onChange={formDataHandler}
        />
        <button
          className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-90 disabled:opacity-65"
          onClick={() => setUpdated(true)}
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link to="/create-list">
          <button className="bg-green-700 text-white p-3 rounded-lg w-full uppercase hover:opacity-90 disabled:opacity-80">
            Create Listing
          </button>
        </Link>
      </form>
      <div className="flex justify-between my-4">
        <span className="text-red-700 cursor-pointer" onClick={deleteHandler}>
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={signOutHandler}>
          Sign out
        </span>
      </div>
      <p className="text-red-700 my-5">{error ? currentUser.message : ""}</p>
      <p className="text-green-700 my-5 ">
        {!error && update ? "changes updated" : ""}
      </p>
      <p onClick={handleUserListing} className='text-green-700 text-center font-medium cursor-pointer hover:opacity-80'>Show Listings</p>
      
      {showListing && showListing.length > 0 &&
     <div>
      <h1 className='text-2xl font-semibold text-center my-7'>Listing</h1>
      {showListing.map((list,id)=>{
          return <div key={id} className="flex justify-between items-center my-5">
               <Link to={`/api/list/listing/${list._id}`}>
                 <img src={list.imageUrls} className="h-20 w-15" />
               </Link>
               <Link to={`/api/list/listing/${list._id}`}>
                 <p className="truncate font-semibold">{list.username}</p>
               </Link>
               <div className="flex flex-col items-center">
                 <button className="text-red-600 cursor-pointer uppercase hover:underline">
                   delete
                 </button>
                 <button className="text-green-600 cursor-pointer uppercase hover:underline">
                   edit
                 </button>
               </div>
             </div>
      })}
       </div>
      } 
    </div>
  );
}
