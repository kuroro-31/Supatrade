import { notFound } from 'next/navigation';

import { supabase } from '../../../utils/supabase-client';
import BlogDetail from '../../components/blog/blog-detail';

import type { BlogDetailType } from "../../../utils/blog.types";
type PageProps = {
  params: {
    blogId: string;
  };
};

// ブログ詳細
const BlogDetailPage = async ({ params }: PageProps) => {
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

  return <BlogDetail blog={blogData} />;
};

export default BlogDetailPage;
