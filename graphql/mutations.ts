import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $user_id: ID!
    $isOc: Boolean!
    $isNSFW: Boolean!
    $isSpoiler: Boolean!
  ) {
    insertPosts(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      user_id: $user_id
      isOc: $isOc
      isNSFW: $isNSFW
      isSpoiler: $isSpoiler
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      user_id
      isOc
      isNSFW
      isSpoiler
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($title: String!) {
    insertSubreddit(title: $title) {
      id
      title
      created_at
    }
  }
`

export const ADD_COMMENT = gql`
  mutation MyMutation($post_id: ID, $text: String, $user_id: ID!) {
    insertComment(post_id: $post_id, text: $text, user_id: $user_id) {
      created_at
      id
      post_id
      text
      user_id
    }
  }
`
export const ADD_VOTE = gql`
  mutation MyMutation(
    $post_id: ID
    $comment_id: ID
    $user_id: ID!
    $upvote: Boolean!
  ) {
    addVote(
      post_id: $post_id
      comment_id: $comment_id
      user_id: $user_id
      upvote: $upvote
    ) {
      created_at
      id
      post_id
      upvote
      user_id
      comment_id
    }
  }
`

export const DELETE_VOTE = gql`
  mutation MyMutaiton($vote_id: ID!) {
    deleteVoteByVoteID(id: $vote_id) {
      id
    }
  }
`

export const ADD_USER = gql`
  mutation MyMutation($username: String!, $karma: String!) {
    insertUsers(username: $username, karma: $karma) {
      id
      karma
      username
      created_at
    }
  }
`
