import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import { Card } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import CommentBox from '../Reusable/CommentBox'
import { signIn, useSession } from 'next-auth/react'
import { ADD_COMMENT } from '../../graphql/mutations'
import client from '../../apollo-client'
import Comments from '../Comment/Comments'
import { GET_COMMENTS_BY_POST_ID } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import Upvote from '../Upvote/Upvote'
import toast, { Toaster } from 'react-hot-toast'
interface Props {
  post: Post
}

function Post({ post }: Props) {
  console.log(post)
  const { data: session } = useSession()
  const [comment, setComment] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [commentDisabled, setCommentDisabled] = useState(true)
  const handleCommentChange = (commentValue: any) => {
    if (commentValue.match(/[\w]+/)) {
      setCommentDisabled(false)
      setComment(commentValue)
    } else {
      setCommentDisabled(true)
    }
  }
  const handleComment = async () => {
    if (!comment?.match(/[\S]*/)) return
    if (session?.user && session?.user?.id) {
      setLoading(true)
      const notification = toast.loading('Adding comment...')
      const {
        data: { insertComment: addedComment },
      } = await client.mutate({
        mutation: ADD_COMMENT,
        variables: {
          post_id: post.id,
          user_id: session?.user?.id!,
          text: comment,
        },

        refetchQueries: [
          { query: GET_COMMENTS_BY_POST_ID, variables: { postId: post.id } }, // DocumentNode object parsed with gql
        ],
      })
      setComment(null)
      setLoading(false)
      toast.success('Comment has been added!', { id: notification })
      setCommentDisabled(true)
    }
  }

  const {
    loading: commentsLoading,
    error,
    data,
  } = useQuery(GET_COMMENTS_BY_POST_ID, {
    variables: { postId: post.id },
  })

  const comments = data?.getCommentByPost_id

  return (
    <Card className="flex h-max min-h-[110px] flex-col rounded-md border-[1px] border-[#cccccc] pt-3 shadow-none hover:border-gray-400">
      <div className="flex flex-1 flex-row">
        <div className="w-[7%]">
          <Upvote votes={post.votes} postId={post.id} />
        </div>
        <div className="flex-1  bg-white">
          <div className="my-1 flex flex-1 flex-row items-center justify-start space-x-1 pl-2">
            {/* Subreddit Title */}
            <div className="flex items-center space-x-1 text-xs text-[#8d8d8d]">
              <div>Posted by u/{post.user.username}</div>
              <div></div>
            </div>
          </div>
          {/* Post title */}
          <div className="pl-2 text-lg font-semibold capitalize">
            {post.title}
          </div>

          {/* Post Body */}
          <div className="pl-2 text-sm">{post.body}</div>

          {/* Post Footer */}
          <div className="m-1 flex space-x-3 py-1 px-[1px] text-xs text-upvote">
            {/* Comments */}
            <div className="flex cursor-pointer space-x-1 rounded-sm p-1 font-bold hover:bg-gray-200">
              <div>
                <ChatBubbleOutlineIcon fontSize="small" />
              </div>
              <div>{comments?.length} Comments</div>
            </div>
            {/* Award */}
            <div className="flex cursor-pointer space-x-1 rounded-sm p-1 font-bold hover:bg-gray-200">
              <div>
                <MilitaryTechIcon fontSize="small" />
              </div>
              <div>Award</div>
            </div>
            {/* Share */}
            <div className="flex cursor-pointer space-x-1 rounded-sm p-1 font-bold hover:bg-gray-200">
              <div className="">
                <ShareIcon fontSize="small" />
              </div>
              <div>Share</div>
            </div>
            {/* Save */}
            <div className="flex cursor-pointer space-x-1 rounded-sm p-1 font-bold hover:bg-gray-200">
              <div className="">
                <BookmarkBorderIcon fontSize="small" />
              </div>
              <div>Save</div>
            </div>
          </div>

          {session && session.user && session.user.id && (
            <>
              <div className="mb-2 mt-4 text-xs font-light">
                Comment as{' '}
                <span className=" cursor-pointer text-[#0079d3]">
                  {session?.user?.name}
                </span>
              </div>
              <div className="flex">
                <CommentBox
                  comment={comment}
                  handleCommentChange={handleCommentChange}
                  commentDisabled={commentDisabled}
                  onSubmit={handleComment}
                  loading={loading}
                />
              </div>
            </>
          )}
          {!session?.user && (
            <div className="mr-8 flex items-center rounded-sm border-[1px] border-solid px-2 py-3 text-gray-400">
              <div className="flex-1">Log in to leave a comment!</div>
              <button
                className="rounded-3xl border-2 border-solid border-basicTheme px-[14px] py-[2px] font-semibold text-basicTheme"
                onClick={() => signIn()}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="my-3 mx-auto w-[90%]">
        <hr className="h-2 w-full text-gray-400" />
      </div>
      <Comments comments={comments} />
      <Toaster />
    </Card>
  )
}

export default Post
