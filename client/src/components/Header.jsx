import {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Header() {
    const { currentUser } = useSelector((state)=>state.user);
    const Navigate = useNavigate()
    const [searchParams,setSearchParams] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchParams)
        const searchURL = urlParams.toString();
        Navigate(`/search?${searchURL}`)
    }

    useEffect(()=>{
        const Urlparams = new URLSearchParams(location.search);
        Urlparams.get('searchTerm')
        const paramGetFromUrl = Urlparams.toString();
        if (paramGetFromUrl) {
          setSearchParams(paramGetFromUrl);
        }
    },[location.search])
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-3 max-w-6xl mx-auto">
        <Link to='/'>
          <h1 className="flex items-center">
            <span className="text-slate-700 font-bold text-2xl  sm:text-3xl">Aura</span>
            <span className="text-slate-400 font-bold text-2xl sm:text-3xl">Estates</span>
          </h1>
        </Link>
        <form
          className="bg-slate-100 p-3 rounded-lg flex items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            placeholder="search..."
            className="focus:outline-none  w-24 sm:w-64 bg-transparent"
            onChange={(e) => setSearchParams(e.target.value)}
          />
          <button onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
        <ul className="flex items-center gap-5">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="text-slate-700 hover:underline">
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="object-cover w-8 h-8 rounded-2xl"
                  src={currentUser.image}
                  alt=""
                />
              ) : (
                "Sign In"
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
