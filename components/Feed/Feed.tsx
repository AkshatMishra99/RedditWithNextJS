import React, { useEffect, useState } from 'react'
import client from '../../apollo-client'
import { GET_ALL_POSTS } from '../../graphql/queries'
import _ from 'lodash'
import Post from './Post'
import FeedLoader from '../Reusable/FeedLoader'
import Moment from 'moment'
import { useQuery } from '@apollo/client'

function Feed() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS)
  const feed = _.reverse(_.sortBy(data?.getPostsList, 'created_at'))
  return (
    <div className="mt-[30px] flex flex-1 justify-center text-2xl">
      {!loading && feed && (
        <div className="w-full max-w-[600px] sm:m-auto sm:w-[80%]">
          {_.map(feed, (post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      )}
      {loading && (
        <div className="w-[60%] max-w-[600px] sm:m-auto sm:w-[65%]">
          {Array(10)
            .fill(0)
            .map((i, key) => (
              <FeedLoader key={key} />
            ))}
        </div>
      )}
    </div>
  )
}

export default Feed
