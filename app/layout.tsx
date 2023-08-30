import "../styles/globals.scss";

import { Analytics } from "@vercel/analytics/react";

import { supabase } from "../types/supabase-client"; // 修正したインポート
import SupabaseListener from "./components/supabase-listener";
import SupabaseProvider from "./components/supabase-provider";

// キャッシュをしない
export const revalidate = 0;

export const metadata = {
  title: "Supatrade | 億り人を目指す株のブログ",
  description:
    "Supatradeは、元金30万円からスタートし1億円を目指している投資ブログです。日々のデイトレードの成績や、失敗・反省を記録しています。",
  authors: [
    { name: "Shun-ichiro Tanaka", url: "https://github.com/kuroro-31" },
  ],
  referrer: "origin-when-cross-origin",
  keywords: [
    "株",
    "日本株",
    "株式",
    "テクニカル分析",
    "株価",
    "株価予想",
    "株価予測",
    "日本株 株価",
    "日本株 株価予想",
    "日本株 株価予測",
    "日本株 株価変動",
    "投資",
    "投資家",
    "Python",
    "AI",
    "チャート分析",
    "stock",
    "trade",
    "stock price",
    "stock price prediction",
    "stock price forecast",
    "investment",
    "investor",
    "chart analysis",
    "株価変動",
    "株価変動 予測",
    "株価変動 予想",
    "株価変動 兆し",
  ],
  metadataBase: new URL("https://www.supatrade.trade"),
  colorScheme: "light",
  generator: "Supatrade",
  applicationName: "Supatrade",
  creator: "Shun-ichiro Tanaka",
  publisher: "Shun-ichiro Tanaka",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    title: "Supatrade | 億り人を目指す株のブログ",
    description:
      "Supatradeは、元金30万円からスタートし1億円を目指している投資ブログです。日々のデイトレードの成績や、失敗・反省を記録しています。",
    url: "https://www.supatrade.trade",
    siteName: "Supatrade",
    images: [
      {
        url: "https://www.supatrade.trade/ogp.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://www.supatrade.trade/ogp.png",
        width: 1800,
        height: 1600,
        alt: "Supatrade Image Alt",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supatrade | 億り人を目指す株のブログ",
    description:
      "Supatradeは、元金30万円からスタートし1億円を目指している投資ブログです。日々のデイトレードの成績や、失敗・反省を記録しています。",
    images: ["hhttps://www.supatrade.trade/ogp.png"],
  },
};

/*
|--------------------------------------------------------------------------
| 全ページ共通のレイアウトコンポーネント
|--------------------------------------------------------------------------
*/
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // セッション情報取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="ja">
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
      <Analytics />
    </html>
  );
};

export default RootLayout;
