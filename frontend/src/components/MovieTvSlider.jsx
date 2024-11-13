import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from '../store/content'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SMALL_IMG_BASE_URL } from '../utils/constant';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieTvSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const [movieTvs, setMovieTvs] = useState([])
    const [showArrow, setShowArrow] = useState(false)
    const sliderRef = useRef(null);

    const formatedCategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formatedContentType = contentType === "movie" ? "Movies" : "Tv Shows"

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/netflix/${contentType}/${category}`);
            setMovieTvs(res.data.content)
        }
        getContent();
    }, [contentType, category])

    const scrollLeft = () => {
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:'smooth' })
        }
    }
    const scrollRight = () => {
            sliderRef.current.scrollBy({ left:sliderRef.current.offsetWidth,behavior:'smooth' })
    }
    return (
        <div className='text-white bg-black relative px-5 md:px-20' 
            onMouseEnter={() => setShowArrow(true) }
            onMouseLeave={() => setShowArrow(false)}
        >
            <h2 className='mb-4 text-lg font-bold'>
                {formatedCategoryName} {formatedContentType}
            </h2>
            <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
                {
                    movieTvs.map((movieTv) => (
                        <Link to={`/watch/${movieTv?.id}`} className='min-w-[250px] relative group' key={movieTv.id}>
                            <div className='rounded-lg overflow-hidden'>
                                <img src={SMALL_IMG_BASE_URL + movieTv?.backdrop_path} alt='movieTv' className='transition-transform duration-100 ease-in-out group-hover:scale-125' />
                            </div>
                            <p className='mt-2 text-center'>
                                {movieTv.title || movieTv.name}
                            </p>
                        </Link>
                    ))
                }
            </div>
            { showArrow && (
            <>
                <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' onClick={scrollLeft}>
                    <ChevronLeft size={24}/>
                </button>
                <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' onClick={scrollRight}>
                    <ChevronRight size={24}/>
                </button>
            </>
        )}
        </div>
    )
}

export default MovieTvSlider