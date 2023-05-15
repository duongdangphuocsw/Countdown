import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/index.scss';
export default function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}
