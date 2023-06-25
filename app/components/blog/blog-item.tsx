"use client";

import { format } from "date-fns";
import Link from "next/link";

import type { BlogListType } from "../../../utils/blog.types";
// ブログアイテム
const BlogItem = (blog: BlogListType) => {
  const MAX_LENGTH = 55;
  let content = blog.content.replace(/\r?\n/g, "");

  // 文字数制限
  if (content.length > MAX_LENGTH) {
    content = content.substring(0, MAX_LENGTH) + "...";
  }

  return (
    <Link
      href={`blog/${blog.id}`}
      className="block w-full break-words p-4 mb-4 border hover:border-primary rounded hover:text-primary"
      passHref
    >
      <div className="text-xl mb-4">{blog.title}</div>
      <div className="text-gray-500 text-sm">
        {format(new Date(blog.created_at), "yyyy/MM/dd HH:mm")}
      </div>
    </Link>
  );
};

export default BlogItem;
