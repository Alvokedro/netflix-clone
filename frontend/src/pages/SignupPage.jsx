import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

const SignupPage = () => {
    const { searchParams } = new URL(document.location)
    const emailValue = searchParams.get("email")

    const [formData,setFormData] = useState({
        email : emailValue ? emailValue : "",
        username : "",
        password : ""
    })

    const { signup,isSignup } = useAuthStore();

    function handleInputChange(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        signup(formData);
    }
  return (
    <div className='h-screen w-full hero-bg'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
            <Link to={'/'}>
                <img src='/netflix-logo.png' alt='logo' className='w-52'/>
            </Link>
        </header>
        <div className='flex justify-center items-center mx-3 mt-30'>
            <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                <h1 className='text-center text-white text-2xl font-bold mb-4'>Signup</h1>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email' className='text-sm font-medium text-gray-400 block'>
                            Email
                        </label>
                        <input type='email' 
                        className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
                        placeholder='you@example.com'
                        id='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        name='email'
                        />
                    </div>
                    <div>
                        <label htmlFor='username' className='text-sm font-medium text-gray-400 block'>
                            Username
                        </label>
                        <input type='text'
                        className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
                        placeholder='yourname'
                        id='username'
                        value={formData.username}
                        onChange={handleInputChange}
                        name='username'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='text-sm font-medium text-gray-400 block'>
                            Password
                        </label>
                        <input type='password' 
                        className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
                        placeholder='******'
                        id='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        name='password'
                        />
                    </div>
                    <button type='submit' className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>{isSignup ? "Loading.." : "Signup" }</button>
                </form>
                <div className='text-center text-gray-400'>
                    Already a member?
                    <Link to={"/login"} className='text-red-500 hover:underline ml-1'>Signin</Link>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default SignupPage