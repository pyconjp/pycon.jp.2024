import 'server-only'
import {Category, ConferenceEvent, Talk} from "@/types/Talk";
import {conferenceEvents} from "@/data/event";

export const getTalks: (date: 'day1' | 'day2') => Promise<Talk[]> = async (date: 'day1' | 'day2') => import('@/cache/talks.json')
  .then((module) => module.default as Talk[])
  .then((talks: Talk[]) => talks.filter((talk: Talk) => talk.date === date))
  .catch(() => []);

export const getEvents: (date: 'day1' | 'day2') => Promise<ConferenceEvent[]> = async (date: 'day1' | 'day2') => conferenceEvents.filter((event: ConferenceEvent) => event.date === date);

export const getCategories: (lang: 'ja' | 'en') => Promise<Category> = async (lang: 'ja' | 'en') =>
  new Promise((resolve) =>
    resolve(lang === 'ja'
      ? ({
        4684: 'データサイエンス、AI',
        4695: 'Pythonを用いた開発のプラクティス',
        4683: 'Webアプリケーション',
        4720: 'DevOps、テスト、ドキュメンテーション、パッケージ',
        4685: 'ライブラリやサービスを作ってみた',
        4686: 'Python自体の機能、開発',
        4689: 'その他',
        4690: 'コミュニティ、教育',
        4687: 'IoT、ハードウェア、ネットワーク',
        4688: '映像、音楽、ゲーム、イラスト',
      })
      : ({
        4684: 'Data Science, AI',
        4695: 'Development Practices Using Python',
        4683: 'Web Applications',
        4720: 'DevOps, Testing, Documentation, Packaging',
        4685: 'Creating Libraries and Services',
        4686: 'Python Features and Development',
        4689: 'Others',
        4690: 'Community, Education',
        4687: 'IoT, Hardware, Network',
        4688: 'Video, Music, Games, Illustration',
      })
    )
  );