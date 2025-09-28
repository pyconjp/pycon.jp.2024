import {GetStaticPaths, GetStaticProps} from 'next'
import {getDictionary} from "@/lib/dictionaries"
import {getCameraCrews, getOrganizers, getReviewers} from "@/lib/organizers"
import PageTitle from "@/components/elements/PageTitle"
import OrganizingMembersSection from "@/components/sections/OrganizingMembersSection"
import ChairsSection from "@/components/sections/ChairsSection"
import ReviewersSection from "@/components/sections/ReviewersSection"
import CameraCrewSection from "@/components/sections/CameraCrewSection"
import Head from 'next/head'

type OrganizersPageProps = {
  lang: 'ja' | 'en'
  dictionary: any
  organizers: any[]
  reviewers: any[]
  cameraCrews: any[]
}

export default function Organizers({lang, dictionary, organizers, reviewers, cameraCrews}: OrganizersPageProps) {
  return (
    <>
      <Head>
        <title>{dictionary.menu.organizer} | {dictionary.metadata.title}</title>
        <meta name="description" content={dictionary.metadata.description}/>
      </Head>
      <main>
        <PageTitle title={'Organizing Members'} subTitle={dictionary.menu.organizer}/>
        <ChairsSection lang={lang} dictionary={dictionary}/>
        <OrganizingMembersSection lang={lang} dictionary={dictionary} organizers={organizers}/>
        <ReviewersSection lang={lang} dictionary={dictionary} reviewers={reviewers}/>
        <CameraCrewSection lang={lang} dictionary={dictionary} cameraCrews={cameraCrews}/>
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
  const organizers = await getOrganizers()
  const reviewers = await getReviewers()
  const cameraCrews = await getCameraCrews()

  return {
    props: {
      lang,
      dictionary,
      organizers,
      reviewers,
      cameraCrews
    }
  }
}