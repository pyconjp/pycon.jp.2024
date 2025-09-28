import withMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const config = withMDX()({
  output: 'export',
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
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