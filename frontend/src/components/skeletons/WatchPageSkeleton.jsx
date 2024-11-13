import React from 'react'

const WatchPageSkeleton = () => {
  return (
    <div className='animate-pulse'>
        <div className='bg-gray-700 rounded-md w-40 h-6 mb-4 shimer'></div>
        <div className='bg-gray-700 rounded-md w-full h-96 mb-4 shimer'></div>
        <div className='bg-gray-700 rounded-md w-3/4 h-6 mb-4 shimer'></div>
        <div className='bg-gray-700 rounded-md w-1/2 h-6 mb-4 shimer'></div>
        <div className='bg-gray-700 rounded-md w-40 h-24 shimer'></div>
    </div>
  )
}

export default WatchPageSkeleton