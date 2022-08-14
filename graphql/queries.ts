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
      votes {
        created_at
        id
        post_id
        upvote
        user_id
      }
      comments {
        created_at
        id
        post_id
        text
        user_id
        user {
          created_at
          id
          karma
          username
        }
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
      votes {
        created_at
        id
        post_id
        upvote
        user_id
      }
      comments {
        created_at
        id
        post_id
        text
        user_id
        user {
          created_at
          id
          karma
          username
        }
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

export const GET_COMMENTS_BY_POST_ID = gql`
  query MyQuery($postId: ID!) {
    getCommentByPost_id(post_id: $postId) {
      created_at
      id
      post_id
      text
      user_id
      user {
        created_at
        id
        karma
        username
      }
    }
  }
`

export const GET_COMMENTS_BY_PARENT_COMMENT = gql`
  query MyQuery($parent_comment: ID!) {
    getCommentByParentComment_ID(parent_comment: $parent_comment) {
      created_at
      id
      post_id
      text
      user_id
      user {
        created_at
        id
        karma
        username
      }
    }
  }
`

export const GET_VOTES_BY_POST_ID = gql`
  query MyQuery($postId: String!) {
    getVotesByPostID(post_id: $postId) {
      id
      post_id
      upvote
      user_id
      created_at
      comment_id
    }
  }
`

export const GET_VOTES_BY_COMMENT_ID = gql`
  query MyQuery($commentId: String!) {
    getVotesByCommentID(comment_id: $commentId) {
      id
      post_id
      upvote
      user_id
      created_at
      comment_id
    }
  }
`
