import "../styles/globals.scss";

import { Analytics } from "@vercel/analytics/react";

import { supabase } from "../utils/supabase-client"; // 修正したインポート
import SupabaseListener from "./components/supabase-listener";
import SupabaseProvider from "./components/supabase-provider";
import Head from "./head";

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

  return (
    <html lang="ja">
      <Head />
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
