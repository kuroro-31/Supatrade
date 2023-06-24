"use client";
import { useEffect, useState } from "react";

import { supabase } from "../../../utils/supabase-client";
import BlogItem from "./blog-item";
import BlogPagination from "./blog-pagination";

import type { BlogListType, SearchType } from "../../../utils/blog.types";

// ページネーション
const getPagination = (page: number, size: number) => {
  const page2 = page - 1;
  const from = page2 !== 0 ? page2 * size : 0;
  const to = page2 ? from + size - 1 : size - 1;
  return { from, to };
};

// ブログリスト
const BlogList = ({ searchParams }: SearchType) => {
  const [blogsData, setBlogsData] = useState<BlogListType[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const per_page = 6; // 1ページのブログ数

  // クエリパラメータからページを取得
  let page = 1;
  if (Object.keys(searchParams).length) {
    page = parseInt(searchParams.page, 10);
  }

  const { from, to } = getPagination(page, per_page);

  useEffect(() => {
    // ブログリスト取得
    const fetchBlogs = async () => {
      const { data, count: blogCount } = await supabase
        .from("blogs")
        .select(
          "id, created_at, title, content, image_url, profiles(id, name, avatar_url)",
          {
            count: "exact",
          }
        )
        .order("created_at", { ascending: false }) // コメント投稿順に並び替え
        .range(from, to);

      if (!data) return "notFound";

      setBlogsData(data);
      setCount(blogCount);
    };

    fetchBlogs();
  }, [searchParams, from, to]);

  return (
    <div>
      <div className="flex flex-wrap mb-10">
        {blogsData.map((blog) => {
          return <BlogItem key={blog.id} {...blog} />;
        })}
      </div>

      <div className="flex justify-center items-center">
        {blogsData.length != 0 && (
          <BlogPagination
            allCnt={count!}
            perPage={per_page}
            onPageChange={function (page: number): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BlogList;
