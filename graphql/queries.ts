import { gql } from '@apollo/client'

// SUBREDDITS
export const GET_ALL_SUBREDDITS = gql`
  query GetAllSubreddits {
    getSubredditList {
      id
      created_at
      title
      topic
      members {
        id
        karma
        username
      }
    }
  }
`
export const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditByTopic($title: String!) {
    getSubredditByTopic(title: $title) {
      id
      title
      created_at
    }
  }
`

// POSTS
export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getPostsList {
      body
      id
      image
      isNSFW
      isOc
      isSpoiler
      title
      subreddit_id
      user_id
      created_at
      subreddit {
        created_at
        id
        title
        topic
      }
      user {
        id
        created_at
        karma
        username
      }
    }
  }
`
export const GET_POST_BY_ID = gql`
  query GetPostByID($id: ID!) {
    getPostByID(id: $id) {
      id
      body
      created_at

      image
      isNSFW
      isOc
      isSpoiler
      subreddit_id
      title
      subreddit {
        id
        title
        topic
      }
      user {
        created_at
        id
        karma
        username
      }
    }
  }
`

export const GET_USER_BY_NAME = gql`
  query MyQuery($username: String!) {
    getUserByUsername(username: $username) {
      created_at
      id
      karma
    }
  }
`
