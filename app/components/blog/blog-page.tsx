"use client";

import { useRouter } from "next/navigation";

import Ad3 from "../atoms/adsence/ad3";
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
        <main className="w-full lg:w-2/4 p-6">
          {/* @ts-ignore */}
          <BlogDetail blogId={blogId} router={router} />
        </main>
        <div className="hidden lg:block lg:w-1/4">
          <div className="sticky top-0 lg:pt-12">
            <Ad3 />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BlogPage;
