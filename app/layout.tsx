import "server-only";
import "../styles/globals.scss";

import Head from "next/head";
import { useRouter } from "next/router";

import { Analytics } from "@vercel/analytics/react";

import { supabase } from "../utils/supabase-client"; // 修正したインポート
import SupabaseListener from "./components/supabase-listener";
import SupabaseProvider from "./components/supabase-provider";
import HeadContents from "./head";

// キャッシュをしない
export const revalidate = 0;

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

  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;

  return (
    <html>
      <Head>
        <HeadContents />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />

          <div className="flex flex-col min-h-screen">
            <main className="">{children}</main>
          </div>
        </SupabaseProvider>

        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
