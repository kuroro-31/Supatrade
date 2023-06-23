"use client";

import { useEffect } from "react";

import { useStore } from "../../store";
import { useSupabase } from "./supabase-provider";

// ユーザーがログインまたはログアウトするたびに新しいセッションを取得する
const SupabaseListener = ({
  serverAccessToken,
}: {
  serverAccessToken?: string;
}) => {
  const { setUser } = useStore();
  const { supabase } = useSupabase();

  useEffect(() => {
    // セッション情報取得
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      // ユーザーIDにとメールアドレスを状態管理に設定
      setUser(data.session ? data.session.user : null);
    };
    // リフレッシュ時にセッション情報取得
    getSession();

    // ログイン、ログアウトした時に認証状態を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      // アクセストークンチェック
      if (session?.access_token !== serverAccessToken) {
        // キャッシュクリア
        window.location.reload();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, setUser]);

  return null;
};

export default SupabaseListener;
