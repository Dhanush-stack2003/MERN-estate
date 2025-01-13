import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signinFailure,signinStart,signinSuccess} from '../redux/user/userSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import Oauth  from '../components/auth/oAuth';

export default function SignUp() {

  const dispatch =useDispatch();
  const Navigate = useNavigate();
  const { loading,error } = useSelector((state)=>state.user)
  const [signup,setSignup] = useState({
    username:"",
    email:"",
    password:""
  })

  const formHandler = (e) =>{
    setSignup({...signup,[e.target.name]:e.target.value})
  } 
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      dispatch(signinStart())
      const res = await fetch('/api/auth/signup',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(signup),
    })
    const data =await res.json();
    if(data.success === false){
    dispatch(signinFailure(data.message))
    return;
    }
    console.log(data)
    dispatch(signinSuccess(data))
    Navigate('/sign-in')
    }catch(error){
      alert(error.message)
      dispatch(signinFailure(error))
    }
  }

  return (
    <div className='max-w-xl mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-5'>Sign Up</h1>
      <form className='flex flex-col gap-5'>
        <input name='username' placeholder='username' id='username' value={signup.username} className='border p-3 rounded-lg' onChange={formHandler} />
        <input name='email' placeholder='email' id='password' value={signup.email} className='border p-3 rounded-lg' onChange={formHandler}/>
        <input name='password' placeholder='password' id='password' value={signup.password} className='border p-3 rounded-lg' onChange={formHandler}/>
        <button disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:-55' type='submit' onClick={submitHandler}>{loading ? 'Loading...' : 'Sign Up'}</button>
        <Oauth/>
      </form>
      <div className='flex my-5 gap-2'>
      <p>have an account?</p>
      <span className='text-slate-600'><Link to='/sign-in'>Sign in</Link></span>
      </div>
        {error && <p className='text-red-500 my-5'>{error}</p>}
    </div>
  )
}
