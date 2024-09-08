import type {Metadata} from "next";
import {Inter, Manrope, Montserrat, Noto_Sans_JP} from 'next/font/google'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";
import {getDictionary} from "@/lib/dictionaries";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notojp = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-noto-sans-jp',
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-manrope',
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-montserrat',
});

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: {default: dictionary.metadata.title, template: `%s | ${dictionary.metadata.title}`},
    description: dictionary.metadata.description,
    metadataBase: new URL(import.meta.url),
  };
}

export async function generateStaticParams() {
  return [{lang: 'ja'}, {lang: 'en'}]
}

export default function RootLayout({children, params: {lang}}: Readonly<{
  children: React.ReactNode;
  params: { lang: 'ja' | 'en' }
}>) {
  return (
    <html lang={lang} className={`${inter.variable} ${notojp.variable} ${manrope.variable} ${montserrat.variable}`}>
    <body className="bg-white">
    <Header lang={lang}/>
    <div className="min-h-screen font-noto">
      {children}
    </div>
    <Footer lang={lang}/>
    </body>
    </html>
  );
}
