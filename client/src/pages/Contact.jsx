import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
  const [landLord,setLandLord] = useState(null);
  const [message,setMessage] = useState('');

  useEffect(()=>{
    const getListing = async() => {
    try {
        const list = await fetch(`/api/user/${listing.userRef}`)
        const data = await list.json();
        setLandLord(data)
      }catch (error) {
        console.log(error)
      }}
  getListing()
},[listing.userRef])

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  return (
    <>
      {landLord && <div className='flex flex-col gap-4 mx-1'>
          <p className='text-xl'>
            contact <span className='font-semibold'>{landLord.username}</span> for <span className='font-semibold'>{listing.username}</span>
          </p>
          <textarea rows='2' name='message' placeholder='Enter your message here...' onChange={handleMessage} value={message} className='w-full border p-3 rounded-lg my-3' />
          <Link to={`mailto:${landLord.email}?subject=regarding ${listing.username}&body=${message}`} className='bg-slate-700 text-white p-3 rounded-lg w-full text-center uppercase hover:opacity-90'>
          Submit Message
          </Link>
        </div>
}
    </>
  );
}
