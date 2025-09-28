import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import PageTitle from "@/components/elements/PageTitle"
import VenueAccessSection from "@/components/sections/VenueAccessSection"
import VenueMapSection from "@/components/sections/VenueMapSection"
import Head from 'next/head'

type VenuePageProps = {
  lang: 'ja' | 'en'
  dictionary: any
}

export default function Venue({lang, dictionary}: VenuePageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.venue} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Venue'} subTitle={dictionary.menu.venue}/>
        <VenueMapSection lang={lang} dictionary={dictionary}/>
        <VenueAccessSection lang={lang} dictionary={dictionary}/>
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