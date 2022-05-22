import React from 'react'
import Image from 'next/image'
import RedditText from '../public/reddittext.svg'

import Home from './HomeMenu'
import SearchBar from './SearchBar'
import FeedMenu from './FeedMenu'
import Personal from './Personal'
import Profile from './Profile'
import Burger from './Burger'
function Header() {
  return (
    <div className="top:0 sticky mb-3 flex min-w-max items-center pb-1 pt-2 pl-5 shadow">
      <div className="mr-5 flex  flex-row items-center justify-start">
        <div className="mr-2 shrink-0">
          <Image
            className=" rounded-full"
            src="/redditlogo.png"
            height="30"
            width="30"
          ></Image>
        </div>
        <div className="mr-7 hidden md:block">
          <Image src={RedditText} width="60" height="40"></Image>
        </div>
        <Home />
      </div>
      <div className="mr-5 flex w-20 flex-1 items-center ">
        <SearchBar />
      </div>
      <div className="hidden items-center md:flex  ">
        <div className="mr-2 border-r-2">
          <FeedMenu />
        </div>
        <div>
          <Personal />
        </div>
        <div>
          <Profile />
        </div>
      </div>
      <div>
        <Burger />
      </div>
    </div>
  )
}

export default Header
