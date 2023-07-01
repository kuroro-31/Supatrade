"use client";

import { useRouter } from "next/navigation";

import Footer from "../atoms/footer";
import Header from "../atoms/header";
import BlogDetail from "./blog-detail";

type PageProps = {
  blogId: string;
};

// ブログ詳細
const BlogPage = ({ blogId }: PageProps) => {
  const router = useRouter();
  return (
    <div>
      <Header />
      <div className="container w-full flex justify-between mx-auto">
        <div className="hidden lg:block lg:w-1/4"></div>
        <main className="w-full lg:w-2/4">
          <BlogDetail blogId={blogId} router={router} />
        </main>
        <div className="hidden lg:block lg:w-1/4"></div>
      </div>
      <Footer />
    </div>
  );
};
export default BlogPage;
