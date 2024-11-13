import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const LoginPage = () => {
    const [formData,setFormData] = useState({
        email : "",
        password : ""
    })

    const { login } = useAuthStore();

    function handleInputChange(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        login(formData);
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
                <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>
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
                    <button type='submit' className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>Login</button>
                </form>
                <div className='text-center text-gray-400'>
                    Don't have an account?
                    <Link to={"/signup"} className='text-red-500 hover:underline ml-1'>Signup</Link>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default LoginPage