import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";

interface Post {
  content: string;
}

async function getPost(slug: string): Promise<Post | undefined> {
  let post = undefined;
  try {
    post = await Deno.readTextFile(`./posts/${slug}.md`);
  } catch (error) {
    console.error(`post not found: ${slug}`);
    return undefined;
  }
  return {
    content: post,
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
