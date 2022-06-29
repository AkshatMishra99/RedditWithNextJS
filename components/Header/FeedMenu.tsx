import React from 'react'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import BarChartIcon from '@mui/icons-material/BarChart'
import LiveTvIcon from '@mui/icons-material/LiveTv'

function FeedMenu() {
  return (
    <div className="flex items-center justify-start">
      <div>
        <Tooltip title="Popular">
          <IconButton>
            <DoubleArrowIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="All">
          <IconButton>
            <BarChartIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Live">
          <IconButton>
            <LiveTvIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default FeedMenu
