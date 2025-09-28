import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getContents} from "@/lib/contents"
import PageTitle from "@/components/elements/PageTitle"
import ContentsSection from "@/components/sections/ContentsSection"
import Head from 'next/head'

type ContentsPageProps = {
  lang: 'ja' | 'en'
  dictionary: any
  contents: any[]
}

export default function Contents({lang, dictionary, contents}: ContentsPageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.contents} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Contents of the Day'} subTitle={dictionary.menu.contents}/>
        <ContentsSection lang={lang} dictionary={dictionary} contents={contents}/>
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
  const contents = await getContents(lang)

  return {
    props: {
      lang,
      dictionary,
      contents
    }
  }
}