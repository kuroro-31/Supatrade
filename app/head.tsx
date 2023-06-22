import Head from "next/head";

/*
|--------------------------------------------------------------------------
| Head
|--------------------------------------------------------------------------
*/
const myHead = () => {
  return (
    <Head>
      <title>Supatrade</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Supatrade" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default myHead;
