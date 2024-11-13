import { LogOut, Menu, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'
import { useContentStore } from '../store/content'

const Navbar = () => {
    const [ ismobileMenuOpen,setIsMobileMenuOpen ] = useState(false)
    const { user,logout } = useAuthStore();
    const toogleMobileMenu = () => {
        setIsMobileMenuOpen(!ismobileMenuOpen)
    }

    const { setContentType } = useContentStore();
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
        <div className='flex items-center gap-10 z-20'>
            <Link to={"/"}>
                <img src='/netflix-logo.png' alt='netflix-logo' className='w-32 sm:w-40'/>
            </Link>

            {/* desktop show navbar */}
            <div className='hidden sm:flex gap-2 items-center'>
                <Link to={"/"} className='hover:underline' onClick={() => setContentType("movie")}>Movies</Link>
                <Link to={"/"} className='hover:underline' onClick={() => setContentType("tvshow")}>TV Show</Link>
                <Link to={"/searchHistory"} className='hover:underline'>Search History</Link>
            </div>
        </div>

        <div className='flex gap-3 items-center z-50'>
            <Link to={"/search"}>
                <Search className='size-6 cursor-pointer'/>
            </Link>
            <img src={user.img || "/avatar1.png"} alt='avatar' className='h-8 rounded cursor-pointer'/>
            <LogOut className='size-6 cursor-pointer' onClick={logout}/>
            <div className='sm:hidden'>
                <Menu className='size-6 cursor-pointer' onClick={toogleMobileMenu}/>
            </div>
        </div>

        {/* Mobile show navbar */}

        {
            ismobileMenuOpen && (
                <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                    <Link to={"/"} className='block p-2 hover:underline' onClick={() => setContentType("movie")}>Movies</Link>
                    <Link to={"/"} className='block p-2 hover:underline' onClick={() => setContentType("tvshow")}>TV Shows</Link>
                    <Link to={"/history"} className='block p-2 hover:underline'>Search History</Link>
                </div>
            )
        }
    </header>
  )
}

export default Navbar