import {Content, LocaledContent} from "@/types/Contents";

export const getContents: (lang: 'ja' | 'en') => Promise<LocaledContent[]> = async (lang) => import('@/cache/contents.json')
  .then((module) => module.default as Content[])
  .then((contents: Content[]) => contents.map(content => {
    if (lang === 'ja') {
      return {
        headline: content.title_en,
        title: content.title_ja,
        description: content.description_ja,
        url: content.url,
        image: content.image,
      }
    } else {
      return {
        headline: content.title_en,
        title: content.title_en,
        description: content.description_en,
        url: content.url,
        image: content.image,
      }
    }
  }))
  .catch(() => ([]));