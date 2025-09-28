import {GetStaticPaths, GetStaticProps} from 'next'
import PageTitle from "@/components/elements/PageTitle"
import {getDictionary} from "@/lib/dictionaries"
import CocSection from "@/components/sections/CocSection"
import Head from 'next/head'

type CocPageProps = {
  lang: 'ja' | 'en'
  dictionary: any
}

export default function CoC({lang, dictionary}: CocPageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.coc} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Code of Conduct'} subTitle={dictionary.menu.coc}/>
        <CocSection lang={lang}/>
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
    }
  }
}