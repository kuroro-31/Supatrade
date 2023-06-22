/*
|--------------------------------------------------------------------------
| Head
|--------------------------------------------------------------------------
*/
import Head from "next/head";
import { useRouter } from "next/router";

const MyHead = () => {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`; // 環境変数にサイトのベースURLを設定しておく

  return (
    <Head>
      <title>Supatrade</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Supatrade" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

export default MyHead;
