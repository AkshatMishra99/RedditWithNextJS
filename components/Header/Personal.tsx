import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt'
import ChatIcon from '@mui/icons-material/Chat'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AddIcon from '@mui/icons-material/Add'
import CampaignIcon from '@mui/icons-material/Campaign'
function Personal() {
  const [messages, setMessages] = useState([1])
  const [notifications, setNotifications] = useState([1, 2])
  return (
    <div className="mr-2 flex items-center justify-center">
      <div>
        <Tooltip title="Chat">
          <IconButton>
            <Badge badgeContent={messages.length} color="primary">
              <ChatIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Notifications">
          <IconButton>
            <Badge badgeContent={notifications.length} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Create Post">
          <IconButton>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Advertise">
          <IconButton>
            <CampaignIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default Personal
