import { Handlers, PageProps } from "$fresh/server.ts";
import extract from "$fm";

const POST_DIR = "./posts/";

interface Post {
  title: string;
  publishedAt: Date;
  url: string;
}

async function getPostSlugs(): Promise<Post[]> {
  const files = Deno.readDir(POST_DIR);
  const posts: Post[] = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    const url = `blog/${slug}`;
    const post = await Deno.readTextFile(`${POST_DIR}${file.name}`);
    const { attrs } = extract(post);
    posts.push({
      title: attrs.title as string,
      publishedAt: attrs.date as Date,
      url,
    });
  }
  return posts.sort((a, b) => (a.publishedAt < b.publishedAt) ? 1 : -1);
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
              <a href={post.url}>{post.title} - {post.publishedAt}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
