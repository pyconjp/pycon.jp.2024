import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getSpecialThanks} from "@/lib/special-thanks"
import PageTitle from "@/components/elements/PageTitle"
import SpecialThanksSection from "@/components/sections/SpecialThanksSection"
import Head from 'next/head'

type SpecialThanksPageProps = {
  lang: 'ja' | 'en'
  dictionary: any
  specialThanks: any[]
}

export default function SpecialThanks({lang, dictionary, specialThanks}: SpecialThanksPageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.special_thanks} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Special Thanks'} subTitle={dictionary.menu.special_thanks}/>
        <SpecialThanksSection lang={lang} dictionary={dictionary} specialThanks={specialThanks}/>
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
  const specialThanks = await getSpecialThanks()

  return {
    props: {
      lang,
      dictionary,
      specialThanks
    },
    revalidate: 3600
  }
}