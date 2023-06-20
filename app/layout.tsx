import "server-only";
import "../styles/globals.scss";

import { createClient } from "../utils/supabase-server";
import SupabaseListener from "./components/supabase-listener";
import SupabaseProvider from "./components/supabase-provider";

// キャッシュをしない
export const revalidate = 0;

/*
|--------------------------------------------------------------------------
| 全ページ共通のレイアウトコンポーネント
|--------------------------------------------------------------------------
*/
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  // セッション情報取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const access_token = session?.access_token;

  return (
    <html>
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={access_token} />

          <div className="flex flex-col min-h-screen">
            <main className="">{children}</main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
