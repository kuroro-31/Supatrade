/*
|--------------------------------------------------------------------------
| Head
|--------------------------------------------------------------------------
*/
const myHead = () => {
  return (
    // eslint-disable-next-line @next/next/no-head-element
    <head>
      <meta name="author" content="Supatrade" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Supatradeは、Pythonによるテクニカル分析を用いて日本株の短期トレンドの株価予測を行っているプラットフォームです。"
      />
      <meta
        property="og:description"
        content="Supatradeは、Pythonによるテクニカル分析を用いて日本株の短期トレンドの株価予測を行っているプラットフォームです。"
      />
      <meta
        name="twitter:description"
        content="Supatradeは、Pythonによるテクニカル分析を用いて日本株の短期トレンドの株価予測を行っているプラットフォームです。"
      />
      <meta property="og:url" content="https://www.supatrade.trade" />
      <meta property="og:site_name" content="Supatrade" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:image" content="https://www.supatrade.trade/ogp.png" />
      <meta
        property="og:image:secure_url"
        content="https://www.supatrade.trade/ogp.png"
      />
      <meta
        name="twitter:image"
        content="https://www.supatrade.trade/ogp.png"
      />

      <title>Supatrade | 日本株の情報共有サイト</title>

      <link rel="icon" href="/favicon.ico" />
    </head>
  );
};

export default myHead;
