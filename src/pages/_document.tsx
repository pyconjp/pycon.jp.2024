import {DocumentContext, Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head/>
      <body className="bg-white">
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx)
  const lang = ctx.query.lang || 'ja'

  return {
    ...initialProps,
    lang
  }
}