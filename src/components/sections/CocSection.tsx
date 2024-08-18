import dynamic from "next/dynamic";

export default async function CocSection({lang}: { lang: 'ja' | 'en' }) {
  const CocContents = dynamic(() => import('@/components/markdown/coc_' + lang + '.mdx'), {ssr: true});

  return <section className="my-20 mx-auto prose max-w-full lg:w-10/12 w-11/12 prose-li:marker:text-primary-500">
    <CocContents/>
  </section>
}