import { log } from 'console'
import NextAuth from 'next-auth'
import RedditProvider from 'next-auth/providers/reddit'
import client from '../../../apollo-client'
import { ADD_USER } from '../../../graphql/mutations'
import { GET_USER_BY_NAME } from '../../../graphql/queries'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      // Return a cookie value as part of the session
      // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
      // console.log(session, token)
      const { user } = session
      if (user && user.name) {
        const {
          data: { getUserByUsername: existingUser },
        } = await client.query({
          query: GET_USER_BY_NAME,
          variables: { username: user.name },
        })
        // const { getUserByUsername: existingUser } = data
        if (user && user.name && !existingUser) {
          try {
            const {
              data: { insertUsers: newUser },
            } = await client.mutate({
              mutation: ADD_USER,
              variables: {
                username: user.name,
                karma: '2300',
              },
            })

            const userData = { ...session.user, id: newUser.id }
            session.user = userData
          } catch (err) {
            console.error(err)
          }
        } else {
          session.user.id = existingUser.id
        }
      }

      return session
    },
  },
})
