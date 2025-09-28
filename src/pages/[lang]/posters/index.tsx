import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getPosters} from "@/lib/posters"
import PageTitle from "@/components/elements/PageTitle"
import PosterSection from "@/components/sections/PosterSection"
import Head from 'next/head'

type PostersPageProps = {
  lang: 'ja' | 'en'
  dictionary: any
  posters: any
}

export default function Posters({lang, dictionary, posters}: PostersPageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.posters} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Poster Session'} subTitle={dictionary.menu.posters}/>
        <PosterSection lang={lang} dictionary={dictionary} posters={posters}/>
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
  const posters = await getPosters()

  return {
    props: {
      lang,
      dictionary,
      posters
    },
    revalidate: 3600
  }
}