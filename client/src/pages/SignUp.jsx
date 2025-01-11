import React,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)
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
      setLoading(true)
      const res = await fetch('/api/auth/signup',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(signup),
    })
    const data =await res.json();
    if(data.success === false){
    setLoading(false);
    setError(data.message);
    return;
    }
    console.log(data)
    setLoading(false)
    }catch(error){
      alert(error.message)
      setError(error.message)
      setLoading(false)
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
      </form>
      <div className='flex my-5 gap-2'>
      <p>have an account?</p>
      <span className='text-slate-600'><Link to='/sign-in'>Sign in</Link></span>
      </div>
        {error && <p className='text-red-500 my-5'>{error}</p>}
    </div>
  )
}
