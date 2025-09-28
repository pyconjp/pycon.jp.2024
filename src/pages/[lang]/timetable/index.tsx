import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

type TimetablePageProps = {
  lang: 'ja' | 'en'
  dictionary: any
}

export default function Timetable({lang, dictionary}: TimetablePageProps) {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${lang}/timetable/day1`)
  }, [lang, router])

  return (
    <>
      <Head>
        <title>{dictionary.menu.timetable} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <div>Redirecting...</div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {lang: 'ja'}},
      {params: {lang: 'en'}}
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const lang = params?.lang as 'ja' | 'en'
  const dictionary = await getDictionary(lang)

  return {
    props: {
      lang,
      dictionary
    },
    revalidate: 3600
  }
}