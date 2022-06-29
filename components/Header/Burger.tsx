import React from 'react'
import { MenuIcon } from '@heroicons/react/solid'
function Burger() {
  return (
    <div className=" mr-2 flex items-center rounded-sm px-2 hover:bg-gray-100 md:hidden">
      <MenuIcon className="icon" />
    </div>
  )
}

export default Burger
