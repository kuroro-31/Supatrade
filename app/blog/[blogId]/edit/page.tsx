import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "../../../../types/supabase-browser";
import Header from "../../../components/atoms/header";
import BlogEdit from "../../../components/blog/blog-edit";

type PageProps = {
  params: {
    blogId: string;
  };
};

export const metadata = ({ params }: PageProps): Metadata => ({
  title: "記事の編集 | Supatrade",
  alternates: {
    canonical: params ? `/blog/${params.blogId}/edit` : "/blog/edit",
  },
});

// ブログ編集ページ
const BlogEditPage = async ({ params }: PageProps) => {
  const supabase = createClient();

  // ブログ詳細取得
  const { data: blog } = await supabase
    .from("blogs")
    .select()
    .eq("id", params.blogId)
    .single();

  // ブログが存在しない場合
  if (!blog) return notFound();

  return (
    <div className="">
      <Header />
      <div className="my-8">
        <BlogEdit blog={blog} />
      </div>
    </div>
  );
};

export default BlogEditPage;
