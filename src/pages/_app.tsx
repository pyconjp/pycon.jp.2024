import type {AppProps} from 'next/app'
import {Inter, Manrope, Montserrat, Noto_Sans_JP} from 'next/font/google'
import {useRouter} from 'next/router'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import {getDictionary} from '@/lib/dictionaries'
import {useEffect, useState} from 'react'
import "@/app/globals.css"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notojp = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-noto-sans-jp',
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-manrope',
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-montserrat',
})

export default function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()
  const {lang} = router.query as { lang: 'ja' | 'en' }
  const [dictionary, setDictionary] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(lang || 'ja')
      setDictionary(dict)
    }
    loadDictionary()
  }, [lang])

  if (!dictionary) {
    return <div>Loading...</div>
  }

  return (
    <div className={`${inter.variable} ${notojp.variable} ${manrope.variable} ${montserrat.variable}`}>
      <Header lang={lang || 'ja'} dictionary={dictionary}/>
      <div className="min-h-screen font-noto">
        <Component {...pageProps} />
      </div>
      <Footer lang={lang || 'ja'} dictionary={dictionary}/>
    </div>
  )
}