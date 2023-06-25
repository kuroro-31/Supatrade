"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { useStore } from "../../../store";
import Loading from "../../loading";
import { useSupabase } from "../supabase-provider";
import BlogComment from "./blog-comment";

import type { BlogDetailType } from "../../../utils/blog.types";
type PageProps = {
  blog: BlogDetailType;
};

// ブログ詳細
const BlogDetail = ({ blog }: PageProps) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const [myBlog, setMyBlog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // ログインチェック
    if (user?.id != "") {
      setLogin(true);

      // 自分が投稿したブログチェック
      if (user?.id === blog.profiles.id) {
        setMyBlog(true);
      }
    }
  }, [user]);

  // ブログ削除
  const deleteBlog = async () => {
    setLoading(true);

    // supabaseブログ削除
    const { error } = await supabase.from("blogs").delete().eq("id", blog.id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // ファイル名取得
    const fileName = blog.image_url.split("/").slice(-1)[0];

    // 画像を削除
    await supabase.storage.from("blogs").remove([`${user?.id}/${fileName}`]);

    // トップページに遷移
    router.push(`/`);
    router.refresh();

    setLoading(false);
  };

  // 自分が投稿したブログのみ、編集削除ボタンを表示
  const renderButton = () => {
    if (myBlog) {
      return (
        <div className="flex justify-end mb-5">
          {loading ? (
            <div className="w-full h-100vh flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href={`/blog/${blog.id}/edit`} passHref>
                <PencilSquareIcon className="h-5 w-5 text-green-500 hover:brightness-110" />
              </Link>
              <div className="cursor-pointer" onClick={() => deleteBlog()}>
                <TrashIcon className="h-5 w-5 text-red-500 hover:brightness-110" />
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="mx-auto my-12">
      <div className="text-sm text-gray-500 mb-4">
        {format(new Date(blog.created_at), "yyyy/MM/dd HH:mm")}
      </div>

      <div className="mb-16 pb-16 border-b">
        <div className="font-bold text-3xl mb-5">{blog.title}</div>
        <div className="p-4 leading-relaxed break-words whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>

      {renderButton()}

      <BlogComment blog={blog} login={login} />
    </div>
  );
};

export default BlogDetail;
