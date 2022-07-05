import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE, DELETE_VOTE } from '../../graphql/mutations'
import { GET_VOTES_BY_POST_ID } from '../../graphql/queries'
import client from '../../apollo-client'
import toast, { Toaster } from 'react-hot-toast'
import SpinnerWithBackdrop from '../Reusable/SpinnerWithBackdrop'
interface Props {
  votes: [Vote]
  postId: string
}

function Upvote(props: Props) {
  const { postId } = props
  const { data: session } = useSession()
  const [commentsLoading, setCommentsLoading] = useState(false)
  const { loading, error, data } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: { postId: postId },
  })

  const [addVote, { loading: addLoading, error: addError }] = useMutation(
    ADD_VOTE,
    {
      refetchQueries: [GET_VOTES_BY_POST_ID, 'getVotesByPostID'],
    }
  )

  const votes = data?.getVotesByPostID
  const [deleteVote, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_VOTE, {
      refetchQueries: [GET_VOTES_BY_POST_ID, 'getVotesByPostID'],
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
          { query: GET_VOTES_BY_POST_ID, variables: { postId: postId } }, // DocumentNode object parsed with gql
        ],
      })

      await client.mutate({
        mutation: ADD_VOTE,
        variables: {
          post_id: postId,
          user_id: session.user.id,
          upvote: upvote,
        },
        refetchQueries: [
          { query: GET_VOTES_BY_POST_ID, variables: { postId: postId } }, // DocumentNode object parsed with gql
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
    console.log(votes)
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
    return votesCount
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
          post_id: postId,
          user_id: session.user.id,
          upvote: upvote,
        },
      })
    }
    setCommentsLoading(false)
  }
  return (
    <div className="flex flex-col items-center justify-center p-2 text-base text-upvote">
      {hasCurrentUserVoted && hasCurrentUserVoted.upvote ? (
        <ImArrowUp
          size={26}
          className="cursor-pointer text-orange-500 "
          onClick={onVote.bind(null, true)}
        />
      ) : (
        <TbArrowBigTop
          size={28}
          className="cursor-pointer hover:bg-gray-200 hover:text-orange-500"
          onClick={onVote.bind(null, true)}
        />
      )}

      <span className="text-sm font-bold text-black">
        {calculateUpvotes(votes)}
      </span>
      {hasCurrentUserVoted && !hasCurrentUserVoted.upvote ? (
        <ImArrowDown
          size={26}
          className="cursor-pointer text-blue-400 hover:bg-gray-200"
          onClick={onVote.bind(null, false)}
        />
      ) : (
        <TbArrowBigDown
          size={28}
          className="cursor-pointer hover:bg-gray-200 hover:text-blue-400"
          onClick={onVote.bind(null, false)}
        />
      )}
      <SpinnerWithBackdrop loading={commentsLoading} />
    </div>
  )
}

export default Upvote
