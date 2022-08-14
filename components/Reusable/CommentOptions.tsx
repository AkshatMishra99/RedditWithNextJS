import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

function CommentOptions() {
  return (
    <>
      {/* Award */}
      <div className="hidden cursor-pointer items-center justify-between space-x-1 rounded-sm p-2 hover:bg-gray-200 lg:flex">
        <div className="text-xs font-semibold text-upvote">Give award</div>
      </div>
      {/* Share */}
      <div className="flex cursor-pointer items-center justify-between space-x-1 rounded-sm p-2 hover:bg-gray-200">
        <div className="text-xs font-semibold text-upvote">Share</div>
      </div>
      {/* Report */}
      <div className="x hidden cursor-pointer items-center justify-between space-x-1 rounded-sm p-2 hover:bg-gray-200">
        <div className="text-xs font-semibold text-upvote">Report</div>
      </div>
      {/* Save */}
      <div className="hidden cursor-pointer items-center justify-between space-x-1 rounded-sm p-2 hover:bg-gray-200 lg:flex">
        <div className="text-xs font-semibold text-upvote">Save</div>
      </div>
      {/* Follow */}
      <div className="hidden cursor-pointer items-center justify-between space-x-1 rounded-sm p-2 hover:bg-gray-200 lg:flex">
        <div className="text-xs font-semibold text-upvote">Follow</div>
      </div>
      {/* Follow */}
      <div className="flex cursor-pointer items-center justify-between space-x-1 rounded-sm p-1 hover:bg-gray-200 lg:hidden">
        <div className="text-xs font-semibold text-upvote">
          <MoreHorizIcon />
        </div>
      </div>
    </>
  )
}

export default CommentOptions
