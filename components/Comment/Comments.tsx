import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import client from '../../apollo-client'
import { GET_COMMENTS_BY_POST_ID } from '../../graphql/queries'
import SingleComment from './index'
interface PropType {
  comments: Comment[]
}

function Comments(props: PropType) {
  const { comments } = props

  // const comments = data?.getCommentByPost_id
  // console.log(comments)
  return (
    <div>
      {comments?.map((comment: Comment) => (
        <SingleComment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
