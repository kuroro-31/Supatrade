import { Suspense } from "react";

import Footer from "./components/atoms/footer";
import Header from "./components/atoms/header";
import BlogList from "./components/blog/blog-list";
import Loading from "./loading";

import type { SearchType } from "../utils/blog.types";
/*
|--------------------------------------------------------------------------
| メインページ
|--------------------------------------------------------------------------
*/
const Page = ({ searchParams }: SearchType) => {
  return (
    <div className="h-full">
      <Header />

      {/* 非同期対応 */}
      <Suspense fallback={<Loading />}>
        <div className="max-w-8xl mx-auto lg:p-8">
          {/* @ts-ignore*/}
          <BlogList searchParams={searchParams} />
        </div>
      </Suspense>

      <Footer />
    </div>
  );
};

export default Page;
