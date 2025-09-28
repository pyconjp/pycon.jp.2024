import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getLocaledSpecialSponsors, getLocaledSponsors, getSponsors} from "@/lib/sponsors"
import PageTitle from "@/components/elements/PageTitle"
import SponsorPageSponsorSection from "@/components/sections/SponsorPageSponsorSection"
import Head from 'next/head'

type SponsorsPageProps = {
  lang: 'ja' | 'en'
  dictionary: any
  localedSponsors: any[]
  localedSpecialSponsors: any[]
}

export default function Sponsors({lang, dictionary, localedSponsors, localedSpecialSponsors}: SponsorsPageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.sponsor} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Sponsors'} subTitle={dictionary.menu.sponsor_list}/>
        <SponsorPageSponsorSection lang={lang} dictionary={dictionary} localedSponsors={localedSponsors}
                                   localedSpecialSponsors={localedSpecialSponsors}/>
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
  const localedSpecialSponsors = await getLocaledSpecialSponsors(lang)

  return {
    props: {
      lang,
      dictionary,
      localedSponsors,
      localedSpecialSponsors
    },
    revalidate: 3600
  }
}