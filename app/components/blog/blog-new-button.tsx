"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useStore } from "../../../store";

// 新規投稿ボタン
const BlogNewButton = () => {
  const { user } = useStore();
  const [login, setLogin] = useState(false);

  // ログインしている人のみ表示
  const renderButton = () => {
    if (login) {
      return (
        <Link href="/blog/new" passHref>
          <div id="new_post" className="btn">
            新規投稿
          </div>
        </Link>
      );
    }
  };

  useEffect(() => {
    if (user?.id) {
      setLogin(true);
    }
  }, [user]);

  return <>{renderButton()}</>;
};

export default BlogNewButton;
