/*
|--------------------------------------------------------------------------
| Supabase Client
| クライアント側でSupabaseを使用するための設定を提供します。
| これは、ブラウザ上で実行されるJavaScriptコードで使用されます。
| このファイルでは、createClient関数を使用してSupabaseのクライアントを作成しています。
|--------------------------------------------------------------------------
*/

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase environment variables are not set");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
});
