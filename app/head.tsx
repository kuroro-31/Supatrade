import Head from "next/head";

/*
|--------------------------------------------------------------------------
| Head
|--------------------------------------------------------------------------
*/
const myHead = () => {
  return (
    <Head>
      <title>Supatrade | 日本株の情報共有サイト</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Supatradeは、日本株の銘柄についての情報共有を目的としたSNSです。株式投資の情報収集にお役立てください。ただし、株価の上昇を保証するものではありませんので、責任は負いかねます。ご注意ください。"
      />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:url" content="/" />
      <meta property="og:site_name" content="{{ config('app.name') }}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default myHead;
