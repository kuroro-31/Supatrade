"use client";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "../../../types/supabase-client";
import Loading from "../../loading";
import BlogItem from "./blog-item";

import type { BlogListType, SearchType } from "../../../types/blog.types";
// ブログリスト
const BlogList = ({ searchParams }: SearchType) => {
  const [blogsData, setBlogsData] = useState<BlogListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id, created_at, title, content, image_url, profiles(id, name, avatar_url)"
      )
      .order("created_at", { ascending: false }); // コメント投稿順に並び替え

    if (error) throw error;
    if (!data || data.length === 0) {
      setHasMoreItems(false);
    } else {
      setBlogsData((prevBlogsData) => {
        const newData = data.filter(
          (d) => !prevBlogsData.some((p) => p.id === d.id)
        );
        return [...prevBlogsData, ...newData];
      });
    }
    setLoading(false);
  }, [setLoading, setBlogsData]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs, searchParams]);

  return (
    <div className="w-full">
      <div className="mb-10">
        {blogsData.map((blog) => {
          return <BlogItem key={blog.id} {...blog} />;
        })}
      </div>
      {loading && (
        <div className="h-[150px]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default BlogList;
