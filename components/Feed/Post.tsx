import React from 'react'
import Link from 'next/link'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

import ReactTimeAgo from 'react-time-ago'
import Upvote from '../Upvote/Upvote'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import { Card } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import RedditAvatar from '../Reusable/RedditAvatar'
interface Props {
  post: Post
}

function Post({ post }: Props) {
  // console.log(post)
  return (
    <Card className="my-4 flex h-max min-h-[110px] cursor-pointer flex-row rounded-md border-[1px] border-[#cccccc] shadow-none hover:border-gray-400">
      <div className="w-[7%] bg-graycolor">
        <Upvote votes={post.votes} postId={post.id} />
      </div>

      <Link href={`/post/${post.id}`}>
        <div className="flex-1 bg-white">
          <div className="my-1 flex flex-1 flex-row items-center justify-start space-x-1 pl-2">
            <div className="mr-2 w-[5%]">
              <RedditAvatar />
            </div>
            <div className="text-xs font-bold">r/{post.subreddit.title}</div>
            <div className="flex items-start justify-center">
              <div className="flex-1 text-[#8d8d8d]">
                <FiberManualRecordIcon className="text-[3px]" />
              </div>
            </div>
            {/* Subreddit Title */}
            <div className="flex items-center space-x-1 text-xs text-[#8d8d8d]">
              <div>Posted by u/{post.user.username}</div>
              <div>
                <ReactTimeAgo date={new Date(post.created_at)} locale="en-US" />
              </div>
            </div>
          </div>
          {/* Post title */}
          <div className="pl-2 text-lg font-semibold capitalize">
            {post.title}
          </div>

          {/* Post Body */}
          <div className="pl-2 text-sm">{post.body}</div>

          {/* Post Image */}
          <div className="flex justify-center bg-gray-100">
            <img
              className="max-h-[600px] object-contain"
              src={post.image}
              alt=""
            />
          </div>

          {/* Post Footer */}
          <div className="m-1 flex space-x-3 py-1 px-[1px] text-xs text-upvote">
            {/* Comments */}
            <div className="flex space-x-1 rounded-sm p-1 font-bold hover:bg-gray-200">
              <div>
                <ChatBubbleOutlineIcon fontSize="small" />
              </div>
              <div>{post?.comments?.length} Comments</div>
            </div>
            {/* Award */}
            <div className="flex space-x-1 rounded-sm p-1 font-bold hover:bg-gray-200">
              <div>
                <MilitaryTechIcon fontSize="small" />
              </div>
              <div>Award</div>
            </div>
            {/* Share */}
            <div className="flex space-x-1 rounded-sm p-1 font-bold hover:bg-gray-200">
              <div className="">
                <ShareIcon fontSize="small" />
              </div>
              <div>Share</div>
            </div>
            {/* Save */}
            <div className="flex space-x-1 rounded-sm p-1 font-bold hover:bg-gray-200">
              <div className="">
                <BookmarkBorderIcon fontSize="small" />
              </div>
              <div>Save</div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default Post
