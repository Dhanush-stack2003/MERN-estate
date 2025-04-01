import {useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Oauth  from '../components/auth/oAuth';
import { userContext } from '../components/userContext';

export default function SignUp() {

  const Navigate = useNavigate();
  const { loading,error } = useSelector((state)=>state.user)
  const { BackEndUrl } = useContext(userContext)
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
      const res = await fetch(
        `${BackEndUrl}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signup),
        }
      );

      if(!res.ok){
        console.log(res)
      }
     const data =await res.json();
    if(data.success === false){
      console.log("data message"+ data.message)
    return;
    }
    console.log(data.message)
    Navigate('/sign-in')
    }catch(error){
      console.log("error message" + error.message)
      alert(error.message)
    }
  }

  return (
    <div className='max-w-xl mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-5'>Sign Up</h1>
      <form className='flex flex-col gap-5'>
        <input name='username' placeholder='username' id='username' value={signup.username} className='border p-3 rounded-lg' onChange={formHandler} />
        <input name='email' placeholder='email' id='email' value={signup.email} className='border p-3 rounded-lg' onChange={formHandler}/>
        <input name='password' placeholder='password' type='password' id='password' value={signup.password} className='border p-3 rounded-lg' onChange={formHandler}/>
        <button disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:-55' type='submit' onClick={submitHandler}>{loading ? 'Loading...' : 'Sign Up'}</button>
        <Oauth/>
      </form>
      <div className='flex my-5 gap-2'>
      <p>have an account?</p>
      <span className='text-slate-600'><Link to='/sign-in'>Sign in</Link></span>
      </div>
        {error && <p className='text-red-500 my-5'>{error.message}</p>}
    </div>
  )
}
