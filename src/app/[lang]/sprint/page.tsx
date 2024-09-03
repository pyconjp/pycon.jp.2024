import {redirect} from "next/navigation";

export const runtime = 'edge';
export const revalidate = 3600;

export default async function Sprint({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  return redirect('https://pyconjp.connpass.com/event/329084/');
}