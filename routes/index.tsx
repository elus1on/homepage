import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>elusion のほめぱげ</title>
      </Head>
      <div>
        <h1>ここは elusion のホームページだお！(＾ω＾)</h1>
        <h1>
          <a href={"/blog"}>ココに</a>ブログがあるお！みんな見ていってお(＾ω＾)
        </h1>
      </div>
    </>
  );
}
