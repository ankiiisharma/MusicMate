import React from 'react'

const LoadingSkelton = () => {
  return (
    <> 
    
<div role="status" className="max-w-sm animate-pulse mb-2">
    <div className="bg-gray-200 rounded-lg w-[200px] h-[200px] mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
</div>


    </>
  )
}

export default LoadingSkelton