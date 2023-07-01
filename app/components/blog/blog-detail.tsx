"use client";

import { format } from "date-fns";
import Link from "next/link";
import { NextRouter } from "next/router";
import { useEffect, useState } from "react";

import { useStore } from "../../../store";
import { createClient } from "../../../types/supabase-browser";
import Loading from "../../loading";
import { useSupabase } from "../supabase-provider";
import BlogComment from "./blog-comment";

import type { BlogDetailType } from "../../../types/blog.types";
type PageProps = {
  blogId: string;
  router: NextRouter;
};

// ブログ詳細
const BlogDetail = ({ blogId, router }: PageProps) => {
  const [blog, setBlog] = useState<BlogDetailType | null>(null);
  const { supabase } = useSupabase();
  const { user } = useStore();
  const [myBlog, setMyBlog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, content, created_at") // Ensure you're fetching 'created_at'
        .eq("id", blogId)
        .single();

      if (error) {
        console.error("Error fetching blog:", error);
      } else {
        // @ts-ignore
        setBlog(data);
      }
    };

    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    // ログインチェック
    if (user?.id != "") {
      setLogin(true);

      // 自分が投稿したブログチェック
      if (user?.id === blog?.profiles?.id) {
        setMyBlog(true);
      }
    }
  }, [user, blog]);

  // ブログ削除
  const deleteBlog = async () => {
    setLoading(true);

    // supabaseブログ削除
    const { error } = await supabase.from("blogs").delete().eq("id", blog?.id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // ファイル名取得
    const fileName = blog?.image_url.split("/").slice(-1)[0];

    // 画像を削除
    await supabase.storage.from("blogs").remove([`${user?.id}/${fileName}`]);

    // トップページに遷移
    router.push(`/`);

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
              <Link href={`/blog/${blog?.id}/edit`} passHref>
                編集する
              </Link>
              <div className="cursor-pointer" onClick={() => deleteBlog()}>
                削除する
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="mx-auto lg:my-12">
      {blog && (
        <>
          <div className="text-sm text-gray-500 mb-4">
            {format(new Date(blog.created_at), "yyyy/MM/dd HH:mm")}
          </div>

          <div className="mb-16 pb-16 border-b">
            <div className="font-bold text-2xl lg:text-3xl mb-5">
              {blog.title}
            </div>
            <div className="p-4 leading-relaxed break-words whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {renderButton()}

          <BlogComment blog={blog} login={login} />
        </>
      )}
    </div>
  );
};

export default BlogDetail;
