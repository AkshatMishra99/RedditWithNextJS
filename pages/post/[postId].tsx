import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import client from '../../apollo-client'
import { GET_POST_BY_ID } from '../../graphql/queries'
import Post from '../../components/PostPage/Post'
import Head from 'next/head'
import CommentBox from '../../components/Reusable/CommentBox'
function PostPage() {
  const router = useRouter()
  const { postId } = router.query
  const [post, setPost] = useState<Post>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getPost = async () => {
      if (!postId) return
      const {
        data: { getPostByID: postRes },
      } = await client.query({
        query: GET_POST_BY_ID,
        variables: { id: postId },
      })
      if (postRes) {
        setPost({ ...postRes })
      }
      setLoading(false)
    }
    setLoading(true)
    getPost()
  }, [postId])
  return (
    <div className="min-h-full bg-bgcolor p-5">
      <Head>
        <title>{post?.title}</title>
      </Head>
      <div className="flex justify-center">
        <div className="sm:w-[98%] md:w-[80%] lg:w-[60%]">
          <div>{!loading && post && <Post post={post} />}</div>
        </div>
      </div>
    </div>
  )
}

export default PostPage
