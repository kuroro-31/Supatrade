"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import { createClient } from "../../../types/supabase-browser";
import Footer from "../../components/atoms/footer";
import Header from "../../components/atoms/header";
import BlogDetail from "../../components/blog/blog-detail";

import type { BlogDetailType } from "../../../types/blog.types";

type PageProps = {
  params: {
    blogId: string;
  };
};

// ブログ詳細
const BlogDetailPage = ({ params }: PageProps) => {
  const [blogData, setBlogData] = useState<BlogDetailType | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const supabase = createClient();
      // ブログ詳細取得
      const { data } = await supabase
        .from("blogs")
        .select(
          "id, created_at, title, content, image_url, profiles(id, name, avatar_url), comments(id, content, created_at, profiles(id, name, avatar_url), likes(user_id))"
        ) // コメント取得
        .eq("id", params.blogId)
        .order("created_at", { foreignTable: "comments", ascending: false })
        .returns<BlogDetailType>() // 型を指定
        .single();
      // ブログが存在しない場合
      if (!data) return notFound();
      setBlogData(data);
    };

    fetchBlogData();
  }, [params.blogId]);

  if (!blogData) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <Header />
      <div className="container w-full flex justify-between mx-auto py-8 px-6 lg:p-12">
        <div className="hidden lg:block lg:w-1/4"></div>
        <main className="w-full lg:w-2/4">
          <BlogDetail blog={blogData} />
        </main>
        <div className="hidden lg:block lg:w-1/4"></div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
