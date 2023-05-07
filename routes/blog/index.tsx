import { Handlers, PageProps } from "$fresh/server.ts";

const POST_DIR = "./posts/";

interface Post {
  slug: string;
  updatedAt: Date;
  url: string;
}

async function getPostSlugs(): Promise<Post[]> {
  const files = Deno.readDir(POST_DIR);
  const posts: Post[] = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    const fullPath = `${POST_DIR}${file.name}`;
    const updatedAt = (await Deno.stat(fullPath)).mtime || new Date();
    const url = `blog/${slug}`;
    posts.push({ slug, updatedAt, url });
  }
  return posts;
}

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPostSlugs();
    return ctx.render(posts);
  },
};

export default function Index(props: PageProps<Post[]>) {
  return (
    <>
      <h1>ブログ記事一覧だお！(＾ω＾)</h1>
      <ul>
        {props.data.map((post) => {
          return (
            <li>
              <a href={post.url}>{post.slug}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
