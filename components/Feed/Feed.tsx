import React, { useEffect, useState } from 'react'
import client from '../../apollo-client'
import { GET_ALL_POSTS } from '../../graphql/queries'
import _ from 'lodash'
import Post from './Post'
import FeedLoader from '../Reusable/FeedLoader'
import Moment from 'moment'

function Feed() {
  const [feed, setFeed] = useState<Array<Post>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getFeed = async () => {
      const {
        data: { getPostsList: feedRes },
      } = await client.query({
        query: GET_ALL_POSTS,
      })
      if (feedRes) {
        const sortedFeeds = _.reverse(
          _.sortBy(feedRes, (post) => Moment(post.created_at))
        )
        setFeed({ ...sortedFeeds })
      }
      setLoading(false)
    }
    setLoading(true)
    getFeed()
  }, [])
  // console.log(feed, loading)
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
