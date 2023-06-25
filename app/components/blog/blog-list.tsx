"use client";
import { useEffect, useRef, useState } from "react";

import { supabase } from "../../../utils/supabase-client";
import Loading from "../../loading";
import BlogItem from "./blog-item";

import type { BlogListType, SearchType } from "../../../utils/blog.types";
// ブログリスト
const BlogList = ({ searchParams }: SearchType) => {
  const [blogsData, setBlogsData] = useState<BlogListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const per_page = 6; // 1ページのブログ数
  const currentPage = useRef(0); // 現在のページ数を追跡

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id, created_at, title, content, image_url, profiles(id, name, avatar_url)"
      )
      .order("created_at", { ascending: false }) // コメント投稿順に並び替え
      .range(
        currentPage.current * per_page,
        (currentPage.current + 1) * per_page - 1
      );

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
      currentPage.current += 1; // ページ数を増やす
    }
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [searchParams]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    fetchBlogs();
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        {blogsData.map((blog) => {
          return <BlogItem key={blog.id} {...blog} />;
        })}
      </div>
      <div className="h-[150px]">
        {loading && (
          <div>
            <Loading />
          </div>
        )}
        {/* {!hasMoreItems && <div>No more items</div>} */}
      </div>
    </div>
  );
};

export default BlogList;
