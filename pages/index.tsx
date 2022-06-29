import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed/Feed'
import PostBox from '../components/AddPost/PostBox'

const Home: NextPage = () => {
  return (
    <div className="bg-bgcolor">
      <Head>
        <title>Reddit 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Post Box */}
      <PostBox />
      {/* Feed */}
      <div className="flex">
        <Feed />
      </div>
    </div>
  )
}

export default Home
