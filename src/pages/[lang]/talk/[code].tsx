import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import PageTitle from "@/components/elements/PageTitle"
import TimetableSection from "@/components/sections/TimetableSection"
import TimetableModalSection from "@/components/sections/TimetableModalSection"
import {getCategories, getEvents, getTalk, getTalks} from "@/lib/timetable"
import {Talk} from "@/types/Talk"
import Head from 'next/head'

type TalkPageProps = {
  lang: 'ja' | 'en'
  talk: Talk
  dictionary: any
  talks: any[]
  events: any[]
  categories: any[]
  keynoteSpeaker: any
}

export default function TalkPage({lang, talk, dictionary, talks, events, categories, keynoteSpeaker}: TalkPageProps) {
  return (
    <>
      <Head>
        <title>{talk.title} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Timetable'} subTitle={dictionary.menu.timetable}/>
        <TimetableSection lang={lang} date={talk.date} talks={talks} events={events} categories={categories}
                          keynoteSpeaker={keynoteSpeaker}/>
        <TimetableModalSection lang={lang} talk={talk}/>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const talks1 = await getTalks('day1')
  const talks2 = await getTalks('day2')
  const allTalks = [...talks1, ...talks2]
  const languages = ['ja', 'en']

  const paths = []
  for (const lang of languages) {
    for (const talk of allTalks) {
      paths.push({
        params: {lang, code: talk.code}
      })
    }
  }

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const lang = params?.lang as 'ja' | 'en'
  const code = params?.code as string
  const dictionary = await getDictionary(lang)
  const talk = await getTalk(code)

  if (!talk) {
    return {
      notFound: true
    }
  }

  const talks = await getTalks(talk.date)
  const events = await getEvents(talk.date)
  const categories = await getCategories(lang)
  const {keynote_day1, keynote_day2} = dictionary.conference

  return {
    props: {
      lang,
      talk,
      dictionary,
      talks,
      events,
      categories,
      keynoteSpeaker: {keynote_day1: keynote_day1.speaker, keynote_day2: keynote_day2.speaker}
    },
    revalidate: 3600
  }
}