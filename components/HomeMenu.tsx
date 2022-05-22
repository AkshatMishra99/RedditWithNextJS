import Image from 'next/image'
import React from 'react'

function Home() {
  return (
    <div className="flex items-center justify-between rounded border-2 border-transparent p-1 px-2 hover:border-gray-50 md:w-64">
      <div className="flex justify-start">
        <div className="mr-3 shrink-0 align-middle">
          <Image src="/home.png" width="20" height="20"></Image>
        </div>
        <div className="hidden pb-1 md:block">Home</div>
      </div>
      <div>
        <Image src="/arrowdown.png" height="14" width="14"></Image>
      </div>
    </div>
  )
}

export default Home
