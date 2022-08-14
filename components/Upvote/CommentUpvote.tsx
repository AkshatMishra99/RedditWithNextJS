import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE, DELETE_VOTE } from '../../graphql/mutations'
import { GET_VOTES_BY_COMMENT_ID } from '../../graphql/queries'
import client from '../../apollo-client'
import toast from 'react-hot-toast'
import SpinnerWithBackdrop from '../Reusable/SpinnerWithBackdrop'
interface Props {
  commentId: Number
}

function CommentUpvote(props: Props) {
  const { commentId } = props
  const { data: session } = useSession()
  const [commentsLoading, setCommentsLoading] = useState(false)
  const { loading, error, data } = useQuery(GET_VOTES_BY_COMMENT_ID, {
    variables: { commentId: commentId },
  })

  const [addVote, { loading: addLoading, error: addError }] = useMutation(
    ADD_VOTE,
    {
      refetchQueries: [GET_VOTES_BY_COMMENT_ID, 'getVotesByCommentID'],
    }
  )

  const votes = data?.getVotesByCommentID
  const [deleteVote, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_VOTE, {
      refetchQueries: [GET_VOTES_BY_COMMENT_ID, 'getVotesByCommentID'],
    })
  useEffect(() => {
    setCommentsLoading(loading || addLoading || deleteLoading)
  }, [loading, addLoading, deleteLoading])

  const updateVotesByVoteID = async (voteId: string, upvote: Boolean) => {
    if (!session || !session.user) {
      toast('You need to sign in to upvote!')
      return
    }
    try {
      const { data } = await client.mutate({
        mutation: DELETE_VOTE,
        variables: {
          vote_id: voteId,
        },
        refetchQueries: [
          {
            query: GET_VOTES_BY_COMMENT_ID,
            variables: { commentId: commentId },
          }, // DocumentNode object parsed with gql
        ],
      })

      await client.mutate({
        mutation: ADD_VOTE,
        variables: {
          comment_id: commentId,
          user_id: session.user.id,
          upvote: upvote,
        },
        refetchQueries: [
          {
            query: GET_VOTES_BY_COMMENT_ID,
            variables: { commentId: commentId },
          }, // DocumentNode object parsed with gql
        ],
      })
    } catch (err) {
      console.log(err)
      return
    }
  }

  const hasCurrentUserVoted = _.find(
    votes,
    (v) => v?.user_id === session?.user?.id!
  )
  // console.log(hasCurrentUserVoted, data, session)
  // const upvotes=votes.reduce
  const calculateUpvotes = (votes: Vote[]) => {
    let votesCount: String | number = _.reduce(
      votes,
      (acc, curr) => {
        if (curr.upvote) {
          return acc + 1
        }
        return acc - 1
      },
      0
    )
    if (votesCount > 10000) {
      votesCount = `${_.round(votesCount / 1000, 2)}k`
    }
    return votesCount !== 0 ? votesCount : 'Vote'
  }

  const onVote = async (upvote: Boolean) => {
    if (!(session && session.user && session.user.id)) {
      toast('You need to sign in to upvote!')
      return
    }
    setCommentsLoading(true)
    // console.log('here', hasCurrentUserVoted, upvote)
    if (hasCurrentUserVoted) {
      if (hasCurrentUserVoted.upvote === upvote) {
        deleteVote({ variables: { vote_id: hasCurrentUserVoted.id } })
      } else {
        await updateVotesByVoteID(hasCurrentUserVoted.id, upvote)
      }
    } else {
      addVote({
        variables: {
          comment_id: commentId,
          user_id: session.user.id,
          upvote: upvote,
        },
      })
    }
    setCommentsLoading(false)
  }
  return (
    <>
      <div className="flex flex-row items-center space-x-1 p-2 pl-0 text-base ">
        {hasCurrentUserVoted && hasCurrentUserVoted.upvote ? (
          <ImArrowUp
            size={20}
            className="cursor-pointer text-orange-500 "
            onClick={onVote.bind(null, true)}
          />
        ) : (
          <TbArrowBigTop
            size={23}
            className="cursor-pointer hover:bg-gray-200 hover:text-red-400"
            onClick={onVote.bind(null, true)}
          />
        )}

        <span className="text-sm font-bold text-black">
          {calculateUpvotes(votes)}
        </span>
        {hasCurrentUserVoted && !hasCurrentUserVoted.upvote ? (
          <ImArrowDown
            size={20}
            className="cursor-pointer text-blue-400 hover:bg-gray-200"
            onClick={onVote.bind(null, false)}
          />
        ) : (
          <TbArrowBigDown
            size={23}
            className="cursor-pointer hover:bg-gray-200 hover:text-blue-400"
            onClick={onVote.bind(null, false)}
          />
        )}
        {/* <SpinnerWithBackdrop loading={commentsLoading} /> */}
      </div>
      <div className="flex flex-row items-center space-x-1 p-2 pl-0 text-base "></div>
    </>
  )
}

export default CommentUpvote
