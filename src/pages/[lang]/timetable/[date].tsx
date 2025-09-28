import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getCategories, getEvents, getTalks} from "@/lib/timetable"
import PageTitle from "@/components/elements/PageTitle"
import TimetableSection from "@/components/sections/TimetableSection"
import Head from 'next/head'

type TimetableDatePageProps = {
  lang: 'ja' | 'en'
  date: 'day1' | 'day2'
  dictionary: any
  talks: any[]
  events: any[]
  categories: any[]
  keynoteSpeaker: any
}

export default function TimetableDate({
                                        lang,
                                        date,
                                        dictionary,
                                        talks,
                                        events,
                                        categories,
                                        keynoteSpeaker
                                      }: TimetableDatePageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.timetable} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Timetable'} subTitle={dictionary.menu.timetable}/>
        <TimetableSection lang={lang} date={date} talks={talks} events={events} categories={categories}
                          keynoteSpeaker={keynoteSpeaker}/>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dates = ['day1', 'day2']
  const languages = ['ja', 'en']

  const paths = []
  for (const lang of languages) {
    for (const date of dates) {
      paths.push({
        params: {lang, date}
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
  const date = params?.date as 'day1' | 'day2'
  const dictionary = await getDictionary(lang)
  const talks = await getTalks(date)
  const events = await getEvents(date)
  const categories = await getCategories(lang)
  const {keynote_day1, keynote_day2} = dictionary.conference

  return {
    props: {
      lang,
      date,
      dictionary,
      talks,
      events,
      categories,
      keynoteSpeaker: {keynote_day1: keynote_day1.speaker, keynote_day2: keynote_day2.speaker}
    },
    revalidate: 3600
  }
}