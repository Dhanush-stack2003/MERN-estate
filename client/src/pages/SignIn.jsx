import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [error, setError] = useState(null);
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
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signIn),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      console.log(data);
      setLoading(false);
      navigate('/')
    } catch (error) {
      alert(error.message);
      setError(error.message);
      setLoading(false);
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
      </form>
      <div className="flex my-5 gap-2">
        <p>Don't have an account?</p>
        <span className="text-slate-600">
          <Link to="/sign-up">Sign in</Link>
        </span>
      </div>
      {error && <p className="text-red-500 my-5">{error}</p>}
    </div>
  );
}
