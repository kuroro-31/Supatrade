import 'server-only';
import '../styles/globals.scss';

import { supabase } from '../utils/supabase-client'; // 修正したインポート
import SupabaseListener from './components/supabase-listener';
import SupabaseProvider from './components/supabase-provider';
import Head from './head';

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
    <html>
      <Head />

      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />

          <div className="flex flex-col min-h-screen">
            <main className="">{children}</main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
