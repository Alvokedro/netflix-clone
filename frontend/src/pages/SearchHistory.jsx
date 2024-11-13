import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { SMALL_IMG_BASE_URL } from '../utils/constant';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

const SearchHistory = () => {
    const [searchHistory,setSearchHistory] = useState([]);

    useEffect(() =>{
        const getSearchHistory = async() => {
            try {
                const res = await axios.get(`/api/v1/netflix/search/history`);
                setSearchHistory(res.data.history)
            } catch (error) {
                setSearchHistory([])
            }
        }
        getSearchHistory()
    },[])

    const handleDelete = async(id) => {
        try {
            const res = await axios.delete(`/api/v1/netflix/search/history/remove/${id}`);
            setSearchHistory(searchHistory.filter(item => item.id !== id))
            toast.success(res.data.message)
        } catch (error) {
            toast.error("Failed to delete")
        }
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const month = monthNames[date.getUTCMonth()];
        const day = date.getUTCDay();
        const year = date.getUTCFullYear();

        return `${month} ${day} ${year}`
    }

  return (
    <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <h1 className='text-3xl font-bold mb-8'>Search History</h1>
        {
            searchHistory?.length === 0 && (
                <div className='flex justify-center items-center h-96'>
                    <p className='text-xl'>No search History</p>
                </div>
            )
        }
        {
            searchHistory?.length > 0 && (
                <div className='max-w-[80rem] mx-auto px-4 py-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            searchHistory.map((item) => (
                                <div className='bg-gray-800 p-4 rounded flex items-start' key={item.id}>
                                    <img src={SMALL_IMG_BASE_URL + item.image} alt='history image' className='size-16 rounded-full object-cover mr-4'/>
                                    <div className='flex flex-col'>
                                        <span className='text-white text-lg'>{item.title}</span>
                                        <span className='text-gray-400 text-sm'>{formatDate(item.createdAt)}</span>
                                    </div>
                                    <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                                        item.searchType === "movie" ? 'bg-red-600' : item.searchType === "tv-show" ? "bg-blue-600" : "bg-green-600"
                                    }`}>
                                        {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
                                    </span>

                                    <Trash className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600' onClick={() => handleDelete(item?.id)}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default SearchHistory