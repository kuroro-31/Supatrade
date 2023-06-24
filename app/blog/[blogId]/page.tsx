import { notFound } from "next/navigation";

import { createClient } from "../../../utils/supabase-browser";
import Footer from "../../components/atoms/footer";
import Header from "../../components/atoms/header";
import BlogDetail from "../../components/blog/blog-detail";

import type { BlogDetailType } from "../../../utils/blog.types";
type PageProps = {
  params: {
    blogId: string;
  };
};

// ブログ詳細
const BlogDetailPage = async ({ params }: PageProps) => {
  const supabase = createClient();

  // ブログ詳細取得
  const { data: blogData } = await supabase
    .from("blogs")
    .select(
      "id, created_at, title, content, image_url, profiles(id, name, avatar_url), comments(id, content, created_at, profiles(id, name, avatar_url), likes(user_id))"
    ) // コメント取得
    .eq("id", params.blogId)
    .order("created_at", { foreignTable: "comments", ascending: false })
    .returns<BlogDetailType>() // 型を指定
    .single();

  // ブログが存在しない場合
  if (!blogData) return notFound();

  return (
    <div>
      <Header />
      <BlogDetail blog={blogData} />
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
