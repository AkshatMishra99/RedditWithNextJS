import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Badge from '@mui/material/Badge'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { LogoutIcon } from '@heroicons/react/outline'
interface Props {
  session: Session
}
function Profile(props: Props) {
  const { session } = props
  // console.log(session)
  const name = session?.user?.name
  const karma = '3.4k'

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event)
    if (!anchorEl) setAnchorEl(event.currentTarget)
    else setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSignOut = () => {
    handleClose()
    signOut()
  }
  return (
    <div>
      <div
        id="fade-button"
        className="mr-3 flex cursor-pointer items-center justify-between rounded border-2 border-transparent pr-3 hover:border-gray-50 lg:w-48"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
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
            <div className="truncate">{name}</div>
            <div className="text-somewhat-grey">{karma} karma</div>
          </div>
        </div>
        <div className="">
          <Image src="/arrowdown.png" height="10" width="10"></Image>
        </div>
      </div>
      <Menu
        className="w-80"
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          className="flex w-[200px] justify-start space-x-3"
          onClick={handleSignOut}
        >
          <div>
            <LogoutIcon className="h-7 w-7" />
          </div>
          <div>Sign Out</div>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Profile
