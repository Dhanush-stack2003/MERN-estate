import React, { useContext, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {  Link } from 'react-router-dom';
import { 
  updateUserStart,updateUserFailure,
  updateUserSuccess,deleteUserStart,deleteUserFailure
  ,deleteUserSuccess, 
  SignOutUserSuccess,
  SignOutUserStart,
  SignOutUserFailure} from '../redux/user/userSlice';
import { userContext } from '../components/userContext';

export default function Profile() {

  const { currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [update,setUpdated] = useState(false);
  const [error,setError] = useState(false);
  const [showListing,setShowListing] = useState([]);
  const [listingError,setListingError] = useState(false);
  const [ListingNotFound,setListingNotFound] = useState(false)
  const { BackEndUrl } = useContext(userContext)


  const formDataSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      setLoading(true)
      const updateUser = await fetch(`${BackEndUrl}/api/user/update/${currentUser._id}`,{
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
    const user = await fetch(`${BackEndUrl}/api/user/delete/${currentUser._id}`,{
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
    const user = await fetch(`${BackEndUrl}/api/auth/signout`,{
       method:'GET',
       credentials:'include'
    });
    const data = await user.json()
    if(data.success === false){
      dispatch(SignOutUserFailure(data.message))
      return
    }
    dispatch(SignOutUserSuccess(data))
  }catch(error){
    dispatch(SignOutUserFailure(error))
  }}


  const handleUserListing = async () => {
    setListingError(false);
    try {
      const GetListing = await fetch(`${BackEndUrl}/api/list/listing/${currentUser._id}`);
      const data = await GetListing.json();
      if(data.success === false){
        setListingError(data.success)
        return
      }
      if(data.length === 0){
        setListingNotFound(true);
      }
      setShowListing(data)
    } catch (error) {
      setListingError(true);
    }
  }

  const handlerDeleteList =async (id) => {
    try{
    const list = await fetch(`${BackEndUrl}/api/list/listing/delete/${id}`,{
      method:'DELETE'
    })
    const data = await list.json();
    if(data.success === false){
      console.log(data.message)
      return
    }}catch(error){
      console.log(error.message)
    }
  }

  const handleUpdateList =async(updateId) => {
    const list = await fetch(`${BackEndUrl}/api/list/listing/update/${updateId}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify()
    })
    const data = await list.json();
    if(data.success === false){
      console.log(data.message)
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
      <p
        onClick={handleUserListing}
        className="text-green-700 text-center font-medium cursor-pointer hover:opacity-80"
      >
        Show Listings
      </p>

      {showListing && showListing.length > 0 && (
        <div>
          <h1 className="text-2xl font-semibold text-center my-7">Listing</h1>
          {showListing.map((list, id) => {
            return (
              <div key={id} className="flex justify-between items-center my-5">
                <Link to={`/listing/${list._id}`}>
                  <img src={list.imageUrls} className="h-20 w-40" />
                </Link>
                <Link to={`/listing/${list._id}`}>
                  <p className="truncate font-semibold">{list.username}</p>
                </Link>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handlerDeleteList(list._id)}
                    className="text-red-600 cursor-pointer uppercase hover:underline"
                  >
                    delete
                  </button>
                  <Link to={`/update-list/${list._id}`}>
                    <button
                      className="text-green-600 cursor-pointer uppercase hover:underline"
                      onClick={() => handleUpdateList(list._id)}
                    >
                      edit
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="text-red-600">{listingError && listingError}</p>
      {!listingError && ListingNotFound ? <span className='text-slate-800 font-bold'>No listing found</span> : ""}
    </div>
  );
}
