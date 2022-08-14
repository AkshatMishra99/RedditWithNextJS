import React, { useState } from 'react'
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ReactTimeAgo from 'react-time-ago'
import Avatar from '../Reusable/Avatar'
import { useSession } from 'next-auth/react'
import CommentBox from '../Reusable/CommentBox'
import toast from 'react-hot-toast'
import { ADD_CHILD_COMMENT, ADD_COMMENT_THREAD } from '../../graphql/mutations'
import client from '../../apollo-client'
import {
  GET_COMMENTS_BY_PARENT_COMMENT,
  GET_COMMENTS_BY_POST_ID,
} from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import Comments from './Comments'
import CommentOptions from '../Reusable/CommentOptions'
import CommentUpvote from '../Upvote/CommentUpvote'
import CommentLoader from '../Reusable/CommentLoader'

interface PropTypes {
  comment: Comment
}

function Comment(props: PropTypes) {
  const { comment } = props
  const { data: session } = useSession()
  const [childComment, setChildComment] = useState<string | null>(null)
  const [isReplying, setIsReplying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [commentDisabled, setCommentDisabled] = useState(true)
  const onReplyHandler = () => {
    setIsReplying((value) => !value)
  }

  const handleCommentChange = (commentValue: any) => {
    if (commentValue.match(/[\w]+/)) {
      setCommentDisabled(false)
      setChildComment(commentValue)
    } else {
      setCommentDisabled(true)
    }
  }
  const handleComment = async () => {
    if (!childComment?.match(/[\S]*/)) return
    if (session?.user && session?.user?.id) {
      setLoading(true)
      const notification = toast.loading('Replying to comment...')
      const {
        data: { addSubCommentByParentID: addedChildComment },
      } = await client.mutate({
        mutation: ADD_CHILD_COMMENT,
        variables: {
          user_id: session?.user?.id!,
          text: childComment,
          parent_comment: comment.id,
        },
        refetchQueries: [
          {
            query: GET_COMMENTS_BY_PARENT_COMMENT,
            variables: { parent_comment: comment.id },
          }, // DocumentNode object parsed with gql
        ],
      })

      const {
        data: { addCommentThread: addedCommentThread },
      } = await client.mutate({
        mutation: ADD_COMMENT_THREAD,
        variables: {
          child_id: addedChildComment?.id,
          parent_id: comment.id,
        },
      })
      setChildComment(null)
      setLoading(false)
      toast.success('Comment has been added!', { id: notification })
      setCommentDisabled(true)
    }
  }

  const {
    loading: commentsLoading,
    error,
    data,
  } = useQuery(GET_COMMENTS_BY_PARENT_COMMENT, {
    variables: { parent_comment: comment.id },
  })

  const childComments = data?.getCommentByParentComment_ID

  return (
    <div className="my-5 flex-col justify-start ">
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
        <div className="flex items-center justify-start space-x-0.5 text-upvote">
          {/* VotesCount */}
          <CommentUpvote commentId={comment.id} />
          {/* Reply */}
          <div
            className="flex cursor-pointer items-center justify-between space-x-1 rounded-sm p-1 hover:bg-gray-200"
            onClick={onReplyHandler}
          >
            <div>
              <ChatBubbleOutlineIcon fontSize="medium" />
            </div>
            <div className="text-xs font-semibold text-upvote">Reply</div>
          </div>

          <CommentOptions />
        </div>
        {/* Invisible comment box opens when toggled */}
        {isReplying && (
          <div className="border-l-2 border-l-[#edeff1] pl-[25px]">
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
                    comment={childComment}
                    handleCommentChange={handleCommentChange}
                    commentDisabled={commentDisabled}
                    onSubmit={handleComment}
                    loading={loading}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Children Comments thread */}
        <div className="">
          {!commentsLoading && <Comments comments={childComments} />}
          {commentsLoading && <CommentLoader />}
        </div>
      </div>
    </div>
  )
}

export default Comment
