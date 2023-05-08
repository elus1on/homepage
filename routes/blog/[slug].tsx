import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";
import { extract } from "$fm";

interface Post {
  title: string;
  publishedAt: Date;
  content: string;
}

async function getPost(slug: string): Promise<Post | undefined> {
  let text = undefined;
  try {
    text = await Deno.readTextFile(`./posts/${slug}.md`);
  } catch (error) {
    console.error(`post not found: ${slug}`);
    return undefined;
  }
  const { attrs, body } = extract(text);
  return {
    title: attrs.title as string,
    publishedAt: attrs.date as Date,
    content: body,
  };
}

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (!post) {
      return ctx.renderNotFound();
    }
    return ctx.render(post);
  },
};

export default function Blog(props: PageProps<Post>) {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: render(props.data.content) }}
      />
    </>
  );
}
