/*
|--------------------------------------------------------------------------
| Supabase Client
|--------------------------------------------------------------------------
*/
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase environment variables are not set");
}

const options = {
  auth: {
    // ユーザーがブラウザを閉じた後もセッションを維持するためのもの
    persistSession: true,

    // windowオブジェクトが存在する場合にのみwindow.localStorageを使用する
    // Supabaseの認証情報はデフォルトでlocalStorageに保存される
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
};

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  options
);
