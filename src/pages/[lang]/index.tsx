import {GetStaticPaths, GetStaticProps} from 'next'
import HeroSection from '@/components/sections/HeroSection'
import NewsSection from '@/components/sections/NewsSection'
import OverviewSection from "@/components/sections/OverviewSection"
import ConferenceSection from "@/components/sections/ConferenceSection"
import SponsorSection from "@/components/sections/SponsorSection"
import AnnounceSection from "@/components/sections/AnnounceSection"
import {announce} from "@/data/announce"
import {getDictionary} from "@/lib/dictionaries"
import {getBlogs} from "@/lib/blogger"
import {getLocaledSpecialSponsors, getLocaledSponsors, getSponsors} from "@/lib/sponsors"
import Head from 'next/head'
import {Blog} from "@/types/Blog"
import {LocaledSpecialSponsor, LocaledSponsor} from "@/types/Sponsors"

type HomeProps = {
  lang: 'ja' | 'en'
  dictionary: any
  blogs: Blog[]
  sponsors: LocaledSponsor[]
  specialSponsors: LocaledSpecialSponsor[]
}

export default function Home({lang, dictionary, blogs, sponsors, specialSponsors}: HomeProps) {
  return (
    <>
      <Head>
        <title>{dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <HeroSection lang={lang} dictionary={dictionary}/>
        <NewsSection blogs={blogs} dictionary={dictionary}/>
        <AnnounceSection announce={announce} lang={lang} dictionary={dictionary}/>
        <OverviewSection lang={lang} dictionary={dictionary}/>
        <ConferenceSection lang={lang} dictionary={dictionary}/>
        <SponsorSection sponsors={sponsors} dictionary={dictionary} specialSponsors={specialSponsors}/>
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
  const blogs = await getBlogs()
  const allSponsors = await getSponsors()
  const sponsors = getLocaledSponsors(allSponsors, lang)
  const specialSponsors = await getLocaledSpecialSponsors(lang)

  return {
    props: {
      lang,
      dictionary,
      blogs,
      sponsors,
      specialSponsors
    },
    revalidate: 3600
  }
}