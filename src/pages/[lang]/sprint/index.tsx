import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getSprints} from "@/lib/sprints"
import PageTitle from "@/components/elements/PageTitle"
import SprintVenueSection from "@/components/sections/SprintVenueSection"
import SprintSection from "@/components/sections/SprintSection"
import AnnounceSection from "@/components/sections/AnnounceSection"
import SprintOutPutSection from "@/components/sections/SprintOutPutSection"
import {announce} from "@/data/announce"
import Head from 'next/head'

type SprintPageProps = {
  lang: 'ja' | 'en'
  dictionary: any
  sprints: any[]
}

export default function Sprint({lang, dictionary, sprints}: SprintPageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.sprint} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Sprint'} subTitle={dictionary.menu.sprint}/>
        <AnnounceSection announce={announce} lang={lang} dictionary={dictionary}/>
        <SprintVenueSection lang={lang} dictionary={dictionary}/>
        <SprintSection lang={lang} dictionary={dictionary} sprints={sprints}/>
        <SprintOutPutSection lang={lang} dictionary={dictionary} sprints={sprints}/>
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
  const sprints = await getSprints()

  return {
    props: {
      lang,
      dictionary,
      sprints
    }
  }
}