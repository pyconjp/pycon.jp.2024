import withMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const config = withMDX()({
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
})

export default config