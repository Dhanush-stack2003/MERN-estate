import { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  signinFailure,
  signinStart,
  signinSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/auth/oAuth";
import { userContext } from "../components/userContext.jsx";

export default function SignIn() {
  const dispatch = useDispatch();
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const { BackEndUrl } = useContext(userContext)
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const formHandler = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart())
      const res = await fetch(`${BackEndUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(signIn),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailure(data.message))
        return;
      }
      console.log(data);
      dispatch(signinSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signinFailure(error.message))
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-center font-semibold text-3xl my-5">Sign In</h1>
      <form className="flex flex-col gap-5">
        <input
          name="email"
          placeholder="email"
          id="email"
          value={signIn.email}
          className="border p-3 rounded-lg"
          onChange={formHandler}
        />
        <input
          name="password"
          placeholder="password"
          id="password"
          type="password"
          value={signIn.password}
          className="border p-3 rounded-lg"
          onChange={formHandler}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:-55"
          type="submit"
          onClick={submitHandler}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Oauth/>
      </form>
      <div className="flex my-5 gap-2">
        <p>Don't have an account?</p>
        <span className="text-slate-600">
          <Link to="/sign-up">Sign in</Link>
        </span>
      </div>
      {error && <p className="text-red-500 my-5">{error.message}</p>}
    </div>
  );
}
