"use client";

import { useEffect, useState } from "react";

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
  const [currentToken, setCurrentToken] = useState(serverAccessToken);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session ? data.session.user : null);
      setCurrentToken(data.session?.access_token);
    };
    getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setCurrentToken(session?.access_token);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [currentToken, supabase, setUser]);
  return null;
};

export default SupabaseListener;
