import { NextPage } from 'next'
import { AppProps } from 'next/dist/next-server/lib/router/router'

import '../styles/globals.scss'

const MyApp: NextPage<AppProps> = function ({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
