"use client";

import { format } from "date-fns";
import Image from "next/image";
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
    <div className="lg:w-1/4 break-words px-4 mb-8">
      <div className="mb-5">
        <Link href={`blog/${blog.id}`} passHref>
          <Image
            src={blog.image_url}
            className="rounded-lg aspect-video object-cover"
            alt="image"
            width={640}
            height={360}
          />
        </Link>
      </div>
      <div className="text-gray-500 text-sm">
        {format(new Date(blog.created_at), "yyyy/MM/dd HH:mm")}
      </div>
      <div className="font-bold text-xl">{blog.title}</div>
    </div>
  );
};

export default BlogItem;
