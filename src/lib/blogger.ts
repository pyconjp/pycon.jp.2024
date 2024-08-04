import 'server-only'
import {Blog} from "@/types/Blog";

export async function getBlogs() {
  if (!process.env.BLOGGER_API_KEY) {
    return [];
  }

  const blogBaseUrl =
    "https://www.googleapis.com/blogger/v3/blogs/1711203921350230994/posts";
  const blogUrl = `${blogBaseUrl}?key=${process.env.BLOGGER_API_KEY}`;
  const blogResponse = await fetch(blogUrl);
  const {items} = await blogResponse.json();
  const blogs: Blog[] = (items || [])
    .slice(0, 5)
    .map(({url, title, published}: Blog) => ({
      url,
      title,
      published,
    }));

  return blogs;
}