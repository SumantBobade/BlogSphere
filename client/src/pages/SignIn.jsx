import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice.js';
 import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // return setErrorMessage(data.message);
        return dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
      
    } catch (error) { 
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            BLog
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sphere
            </span>
          </Link>
          <p className="text-sm mt-5">
            Unlock exclusive insights—log in to explore my world of tech,
            design, and innovation!
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                type="password"
                placeholder="***********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
              type="submit" disabled={loading}
            >{
                loading ? (
                  <>
                    <Spinner aria-label="Spinner button example" size="sm" light />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign In'
              }</Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

