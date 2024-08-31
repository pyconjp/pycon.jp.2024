import withMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const config = withMDX()({
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pretalx.com',
        port: '',
        pathname: '/media/avatars/**',
      },
    ],
  }
})

export default config