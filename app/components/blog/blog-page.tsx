"use client";

import { useRouter } from "next/navigation";

import Ad1 from "../atoms/adsence/ad1";
import Ad2 from "../atoms/adsence/ad2";
import DmmFx from "../atoms/adsence/dmm_fx";
import NttDocomo from "../atoms/adsence/ntt_docome";
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
          <NttDocomo />
          <DmmFx />
          <Ad1 />
          <Ad2 />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BlogPage;
