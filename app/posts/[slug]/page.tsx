import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote-client/rsc';

export default async function RemoteMdxPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    headers: {
      Authorization: `${process.env.YAST_BLOG_API_KEY}`,
    },
    method: 'GET',
  });
  console.log(res);
  if (!res.ok) {
    return <div>Error loading post</div>;
  }
  const data = await res.json();
  console.log(data);
  const post = data.data as {
    title: string;
    content: string;
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <MDXRemote
        components={{
          Image: ({ src, alt }) => (
            <Image alt={alt} height={500} src={src} width={500} />
          ),
          h1: ({ children }) => (
            <h1 className="font-bold text-2xl">{children}</h1>
          ),
        }}
        source={post.content}
      />
    </div>
  );
}
