import {redirect} from "next/navigation";
import {Metadata} from "next";
import {getDictionary} from "@/lib/dictionaries";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.sprint};
}

export default async function Sprint({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  return redirect('https://pyconjp.connpass.com/event/329084/');
}