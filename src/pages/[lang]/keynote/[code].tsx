import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getCategories, getEvents, getTalks} from "@/lib/timetable"
import PageTitle from "@/components/elements/PageTitle"
import TimetableSection from "@/components/sections/TimetableSection"
import TimetableKeynoteModalSection from "@/components/sections/TimetableKeynoteModalSection"
import {conferenceEvents} from "@/data/event"
import Head from 'next/head'

type KeynotePageProps = {
  lang: 'ja' | 'en'
  keynote: any
  speaker: string
  dictionary: any
  talks: any[]
  events: any[]
  categories: any[]
  keynoteSpeaker: any
}

export default function KeynotePage({
                                      lang,
                                      keynote,
                                      speaker,
                                      dictionary,
                                      talks,
                                      events,
                                      categories,
                                      keynoteSpeaker
                                    }: KeynotePageProps) {
  return (
    <>
      <Head>
        <title>Keynote ({speaker}) | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Timetable'} subTitle={dictionary.menu.timetable}/>
        <TimetableSection lang={lang} date={keynote.date} talks={talks} events={events} categories={categories}
                          keynoteSpeaker={keynoteSpeaker}/>
        <TimetableKeynoteModalSection lang={lang} keynote={keynote} speaker={speaker}/>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const keyCodes = ['keynote_day1', 'keynote_day2']
  const languages = ['ja', 'en']

  const paths = []
  for (const lang of languages) {
    for (const code of keyCodes) {
      paths.push({
        params: {lang, code}
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
  const code = params?.code as 'keynote_day1' | 'keynote_day2'
  const dictionary = await getDictionary(lang)

  const keynote = conferenceEvents.find(event => event.is_keynote && event.code === code)

  if (!keynote || !keynote.is_keynote) {
    return {
      notFound: true
    }
  }

  const speaker = dictionary.conference[keynote.code].speaker
  const talks = await getTalks(keynote.date)
  const events = await getEvents(keynote.date)
  const categories = await getCategories(lang)
  const {keynote_day1, keynote_day2} = dictionary.conference

  return {
    props: {
      lang,
      keynote,
      speaker,
      dictionary,
      talks,
      events,
      categories,
      keynoteSpeaker: {keynote_day1: keynote_day1.speaker, keynote_day2: keynote_day2.speaker}
    },
    revalidate: 3600
  }
}