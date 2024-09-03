import type {Metadata} from "next";
import {Inter, Manrope, Montserrat, Noto_Sans_JP} from 'next/font/google'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";

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

export const metadata: Metadata = {
  title: "PyCon JP 2024",
  description: "PyCon JPは、Pythonユーザが集まり、PythonやPythonを使ったソフトウェアについて情報交換、交流をするためのカンファレンスです。",
};

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
