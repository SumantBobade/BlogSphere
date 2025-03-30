import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left */}
        <div className='flex-1'>
        <Link
        to="/"
        className=" font-bold dark:text-white text-4xl">
        BLog
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Sphere
        </span>
          </Link>
          <p className='text-sm mt-5'>
          Unlock exclusive insights—log in to explore my world of tech, design, and innovation!
          </p>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
            <Label htmlFor="username" value="Your username" />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput type='email' placeholder='name@company.com' id='email' />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput type='password' placeholder='Password' id='password' />
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800" type='submit'>
             Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
