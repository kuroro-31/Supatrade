"use client";

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
      <Suspense
        fallback={
          <div className="w-full h-100vh flex items-center justify-center">
            <Loading />
          </div>
        }
      >
        <div className="container w-full flex justify-between mx-auto py-8 px-6 lg:p-12">
          <div className="hidden lg:block lg:w-1/4"></div>
          <main className="w-full lg:w-2/4">
            <BlogList searchParams={searchParams} />
          </main>
          <div className="hidden lg:block lg:w-1/4"></div>
        </div>
      </Suspense>

      <Footer />
    </div>
  );
};

export default Page;
