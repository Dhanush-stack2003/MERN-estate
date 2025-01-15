import React from 'react'
import {signInWithPopup,getAuth,GoogleAuthProvider } from 'firebase/auth'
import { app } from '../../../firebase';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signinSuccess,signinFailure,signinStart } from '../../redux/user/userSlice'

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const googleAuthendicator =async () => {
    try{
    const provider =new GoogleAuthProvider();
    const Auth = getAuth(app);
    const result = await signInWithPopup(Auth,provider)
    console.log(result)
    dispatch(signinStart())
    const userAuth = await fetch('/api/auth/google',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:result.user.email,
        image:result.user.photoURL,
        username:result.user.displayName
      })
    })
    const res = await userAuth.json();
    if(res.success === false){
      dispatch(signinFailure(res.message))
    }
    dispatch(signinSuccess(res))
    navigate('/profile')
  }catch(error){
    dispatch(signinFailure(error))
    console.log("unable to process "+error)
    }
  }
  return (
    <button type='button' className='bg-red-700 text-white p-3 rounded-lg hover:bg-opacity-90' onClick={googleAuthendicator}>Sign in with Google</button>
  )
}
