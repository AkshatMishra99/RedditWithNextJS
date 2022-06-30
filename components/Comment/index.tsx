import React from 'react'
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb'
import ReactTimeAgo from 'react-time-ago'
import Avatar from '../Reusable/Avatar'

interface PropTypes {
  comment: Comment
}

function Comment(props: PropTypes) {
  const { comment } = props
  return (
    <div className="my-5 flex-col justify-start pl-3">
      <div className="flex items-center justify-start space-x-2">
        <div>
          <Avatar seed={comment.user.username} />
        </div>
        <div className="text-sm font-semibold">{comment.user.username}</div>
        <div className="text-xs text-[#7c7c7c]">
          <ReactTimeAgo date={comment.created_at} locale="en-US" />
        </div>
      </div>
      <div className="ml-5 border-l-2 border-l-[#edeff1] pl-[25px]">
        <div className=" text-sm">{comment.text}</div>
        <div>
          <div className="flex flex-row items-center space-x-1 p-2 pl-0 text-base text-upvote">
            <TbArrowBigTop
              size={23}
              className="cursor-pointer hover:bg-gray-200 hover:text-red-400"
            />

            <span className="text-xs font-bold text-black">Vote</span>
            <TbArrowBigDown
              size={23}
              className="cursor-pointer hover:bg-gray-200 hover:text-blue-400"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Comment
