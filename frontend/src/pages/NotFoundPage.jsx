import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white' style={{backgroundImage : `url('/404.png')`}}>
      <header className='absolute top-0 left-0 p-4 bg-black w-full'>
        <Link to={"/"}>
          <img src='/netflix-logo.png' alt='netflix' className='h-8'/>
        </Link>
      </header>
      <main className='text-center  z-10'>
        <h1 className='text-2xl font-semibold mb-4'>Lost your way?</h1>
        <p className='mb-6 text-xl'>
          Sorry we can not find that page.. You'll find lots to explore on the homepage
        </p>
        <Link to={"/"} className='bg-white text-black py-2 rounded px-4 '>
          Netflix Home
        </Link>
      </main>
      
    </div>
  )
}

export default NotFoundPage