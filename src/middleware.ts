import {NextRequest, NextResponse} from 'next/server';
import {match} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['ja', 'en']
const defaultLocale = 'ja'

function getLocale(req: NextRequest) {
  // リクエストヘッダーの内容から言語を決定する
  let headers = {'accept-language': req.headers.get('accept-language') || defaultLocale}
  let languages = new Negotiator({headers}).languages()

  return match(languages, locales, defaultLocale)
}

export function middleware(req: NextRequest) {
  const {pathname, search} = req.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // URLにlocaleがない場合はリダイレクト
  const locale = getLocale(req)
  req.nextUrl.pathname = `/${locale}${pathname}${search}`;
  return NextResponse.redirect(req.nextUrl)
}

export const config = {
  matcher: [
    "/((?!static|.*\\..*|_next).*)",
  ],
}

