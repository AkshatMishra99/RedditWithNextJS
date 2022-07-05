import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ClassicElement } from 'react'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header/Header'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { UserProvider } from '../appContext'
import { Toaster } from 'react-hot-toast'

// TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <div className="h-screen overflow-y-scroll ">
            <Header />
            <Component {...pageProps} />
            <Toaster />
          </div>
        </SessionProvider>
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp
