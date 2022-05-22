import React from 'react'
import FaceIcon from '@mui/icons-material/Face'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Image from 'next/image'
function Profile() {
  const name = 'MoodConfident'
  const karma = '3.4k'
  return (
    <div className="mr-3 flex items-center justify-between rounded border-2 border-transparent pr-3 hover:border-gray-50 lg:w-48">
      <div className="flex items-center justify-start">
        <div className="p-2">
          <Badge
            color="success"
            variant="dot"
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <AccountCircleIcon />
          </Badge>
        </div>

        <div className="hidden flex-col text-xs lg:flex">
          <div>{name}</div>
          <div className="text-somewhat-grey">{karma} karma</div>
        </div>
      </div>
      <div className="">
        <Image src="/arrowdown.png" height="10" width="10"></Image>
      </div>
    </div>
  )
}

export default Profile
