interface Subreddit {
  created_at: date
  id: string
  title: string
  topic: string
}

interface Users {
  id: string
  created_at: string
  karma: string
  username: string
}

interface Post {
  body: string
  id: string
  image: string
  isNSFW: boolean
  isOc: boolean
  isSpoiler: boolean
  title: string
  subreddit_id: string
  user_id: string
  subreddit: Subreddit
  user: Users
  created_at: date
}

interface Comment {
  created_at: date
  id: number
  post_id: number
  text: string
  user_id: number
  user: Users
}
