/*
|--------------------------------------------------------------------------
| Supabase Server
| サーバー側でSupabaseを使用するための設定を提供します。
| これは、Next.jsのサーバーコンポーネントやAPIルートなど、サーバー上で実行されるJavaScriptコードで使用されます。
| このファイルでは、createServerComponentClient関数を使用してSupabaseのクライアントを作成しています。
|--------------------------------------------------------------------------
*/
import { cookies } from "next/headers";

// utils/supabase-server.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "./database.types";

export const supabase = createServerComponentClient<Database>({
  cookies,
});
