import {Blog} from "@/types/Blog"
import Link from "next/link";
import {parseISO, format} from 'date-fns'


export default async function NewsSection() {
    const blogs = await getBlogs();
  return <div className="my-6">
    <h1>NewsSection</h1>
    <div className="flex flex-col">
    {blogs.map((blog) => (
      <div key={blog.url} className="flex flex-row">
        <div className="w-48">
            {parseDate(blog.published)}
        </div>
        <div className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
            <Link href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.title}
            </Link>
        </div>
      </div>
    ))}
    </div>
    </div>
}

async function getBlogs() {
  if (!process.env.BLOGGER_API_KEY) {
    return [];
  }

  const blogBaseUrl =
    "https://www.googleapis.com/blogger/v3/blogs/1711203921350230994/posts";
  const blogUrl = `${blogBaseUrl}?key=${process.env.BLOGGER_API_KEY}`;
  const blogResponse = await fetch(blogUrl);
  const { items } = await blogResponse.json();
  const blogs: Blog[] = (items || [])
    .slice(0, 5)
    .map(({ url, title, published }: Blog) => ({
      url,
      title,
      published,
    }));

  return blogs;
}

function parseDate(dateString: string) {
    const date = parseISO(dateString);
    return format(date, 'yyyy/MM/dd');
}
