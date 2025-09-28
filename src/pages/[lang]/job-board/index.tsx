import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getLocaledSponsors, getSponsors} from "@/lib/sponsors"
import PageTitle from "@/components/elements/PageTitle"
import JobBoardSection from "@/components/sections/JobBoardSection"
import Head from 'next/head'

type JobBoardPageProps = {
  lang: 'ja' | 'en'
  dictionary: any
  localedSponsors: any[]
}

export default function JobBoard({lang, dictionary, localedSponsors}: JobBoardPageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.job_board} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Job Board'} subTitle={dictionary.menu.job_board}/>
        <JobBoardSection lang={lang} localedSponsors={localedSponsors}/>
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
  const sponsors = await getSponsors()
  const localedSponsors = getLocaledSponsors(sponsors, lang)

  return {
    props: {
      lang,
      dictionary,
      localedSponsors
    }
  }
}