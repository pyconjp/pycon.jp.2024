import {NextRequest, NextResponse} from 'next/server';
import {match} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['ja', 'en']
const defaultLocale = 'ja'

const defaultDate = 'day1';

function getLocale(req: NextRequest) {
  // リクエストヘッダーの内容から言語を決定する
  let headers = {'accept-language': req.headers.get('accept-language') || defaultLocale}
  let languages = new Negotiator({headers}).languages()

  return match(languages, locales, defaultLocale)
}

function middlewareLocale(req: NextRequest) {
  const {pathname, search} = req.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return false;
  }

  // URLにlocaleがない場合はリダイレクト
  const locale = getLocale(req)
  return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, req.url));
}

function middlewareTimetable(req: NextRequest) {
  const {pathname, search} = req.nextUrl

  if (!pathname.endsWith('/timetable')) {
    return false;
  }
  return NextResponse.redirect(new URL(`${pathname}/${defaultDate}${search}`, req.url))
}

function middlewareTalk(req: NextRequest) {
  const {pathname, search} = req.nextUrl

  if (!pathname.endsWith('/talk')) {
    return false;
  }
  return NextResponse.redirect(new URL(`/timetable${search}`, req.url));
}

export function middleware(req: NextRequest) {
  return middlewareLocale(req) || middlewareTimetable(req) || middlewareTalk(req) || NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!static|.*\\..*|_next).*)",
  ]
}

