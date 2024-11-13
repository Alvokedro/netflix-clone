import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constant';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';

const WatchPage = () => {
    const { id } = useParams();
    const { contentType } = useContentStore();
    const sliderRef = useRef(null)
    const [trailers, setTrailers] = useState([])
    const [similarMovieTvs, setSimilarMovieTvs] = useState([])
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)
    const [loading, setLoading] = useState(true);
    const [movieTvDetails, setMovieTvDetails] = useState({})

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/netflix/${contentType}/${id}/trailers`)
                setTrailers(res.data.trailer)
            } catch (error) {
                if (error.message.includes('404')) {
                    setTrailers([])
                }
            }
        }
        getTrailers()
    }, [contentType, id])

    useEffect(() => {
        const getSimilarMoviesTvs = async () => {
            try {
                const res = await axios.get(`/api/v1/netflix/${contentType}/${id}/similars`)
                setSimilarMovieTvs(res.data.similar)
            } catch (error) {
                if (error.message.includes('404')) {
                    setSimilarMovieTvs([])
                }
            }
        }
        getSimilarMoviesTvs();
    }, [contentType, id])

    useEffect(() => {
        const getMoviesTvsDetails = async() => {
            try {
                const res = await axios.get(`/api/v1/netflix/${contentType}/${id}/details`)
                setMovieTvDetails(res.data.detail)
            } catch (error) {
                if(error.message.includes('404')){
                    setMovieTvDetails({})
                }
            }finally{
                setLoading(false)
            }
        }
        getMoviesTvsDetails();
    },[contentType,id])

    const handleNext = () => {
        if(currentTrailerIndex < trailers.length - 1) setCurrentTrailerIndex((currentIndex) => currentIndex + 1)
    }

    const handlePrev = () => {
        if(currentTrailerIndex > 0) setCurrentTrailerIndex((currentIndex) => currentIndex - 1)
    }

    const scrollLeft = () => {
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:'smooth' })
        }
    }
    const scrollRight = () => {
            sliderRef.current.scrollBy({ left:sliderRef.current.offsetWidth,behavior:'smooth' })
    }

    const formatReleaseDate = (date) => {
        return new Date(date).toLocaleDateString("en-us",{
            year : "numeric",
            month : "long",
            day : "numeric"
        })
    }
    if(loading){
        return (<div className='min-h-screen bg-black p-10'>
            <WatchPageSkeleton />
        </div>)
    }
    if(!movieTvDetails){
        return <div className='h-screen bg-black text-white'>
            <div className='max-w-6xl mx-auto'>
                <Navbar />
                <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                    <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not Found</h2>
                </div>
            </div>
        </div>
    }
    return (
        <div className='bg-black min-h-screen text-white'>
            <div className='mx-auto container px-4 py-8 h-full'>
                <Navbar />
                {
                    trailers?.length > 0 && (
                        <div className='flex justify-between items-center mb-4'>
                            <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIndex  === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={currentTrailerIndex === 0}
                            >
                                <ChevronLeft size={24} onClick={handlePrev}/>
                            </button>

                            <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIndex  === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={currentTrailerIndex === trailers.length - 1}
                            >
                                <ChevronRight size={24} onClick={handleNext}/>
                            </button>
                        </div>
                    )
                }
                <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
                    {
                        trailers.length > 0 && (
                            <ReactPlayer 
                                controls={true}
                                width={'100%'}
                                height={'70vh'}
                                className='mx-auto overflow-hidden rounded-lg'
                                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
                            />
                    )}
                    {
                        trailers.length === 0 && (
                            <h2 className='text-xl text-center mt-5'>
                                No trailers available for {" "}
                                <span className='font-bold text-red-600'>{movieTvDetails?.title || movieTvDetails?.name}</span>
                            </h2>
                    )}
                </div>

                {/* movies tvshow details  */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-20'>
                    <div className='mb-4 md:mb-0 '>
                        <h2 className='text-5xl font-bold text-balance'>{movieTvDetails?.title || movieTvDetails?.name}</h2>
                        <p className='mt-2 text-lg'>
                            {formatReleaseDate(movieTvDetails?.release_date || movieTvDetails?.first_air_date)} | {" "}
                                { movieTvDetails?.adult ? (
                                    <span className='text-red-600'>18+</span>
                                ) : (
                                    <span className='text-green-600'>PG-13</span>
                                )
                            }{" "} 
                        </p>
                        <p className='mt-4 text-lg'>{movieTvDetails?.overview}</p>
                    </div>
                    <img src={ORIGINAL_IMG_BASE_URL + movieTvDetails?.poster_path} alt='poster img'
                        className='max-h-[600px] rounded-md'
                    />
                </div>

                { similarMovieTvs.length > 0 && (
                    <div className='mt-12 max-w-5xl mx-auto relative'>
                        <h3 className='text-3xl font-bold mb-4'>Similar Movies/TV Shows</h3>
                        <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
                            {
                                similarMovieTvs.map(similarMovieTv => {
                                    if(similarMovieTv?.poster_path === null) return null;
                                        return (
                                            <Link key={similarMovieTv.id} to={`/watch/${similarMovieTv.id}`} className='w-52 flex-none'>
                                                <img src={SMALL_IMG_BASE_URL + similarMovieTv?.poster_path} alt='poster path' className='w-full h-auto rounded-md'/>
                                                <h4 className='mt-2 text-lg font-semibold'>
                                                    { similarMovieTv?.title || similarMovieTv?.name}
                                                </h4>
                                            </Link>
                                        )
                                    }
                                )
                            }
                            <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-100 cursor-pointer bg-red-600 text-white rounded-full' 
                            onClick={scrollRight} />
                            <ChevronLeft className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-100 cursor-pointer bg-red-600 text-white rounded-full' 
                            onClick={scrollLeft} />
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchPage