import { UnknownPageProps } from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <>
      <Head>
        <meta http-equiv="refresh" content="5;url=/" />
      </Head>
      <p>{url.pathname} なんてページはなかったお…(；ω；)</p>
      <p>5秒後にトップページにリダイレクトするお！(＾ω＾)</p>
    </>
  );
}
