"use client";

import { Suspense } from "react";

import Ad3 from "./components/atoms/adsence/ad3";
import Footer from "./components/atoms/footer";
import Header from "./components/atoms/header";
import BlogList from "./components/blog/blog-list";
import Loading from "./loading";

import type { SearchType } from "../types/blog.types";
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
        <div className="container w-full flex flex-col-reverse lg:flex-row justify-between mx-auto py-6 lg:py-12 px-8 lg:px-20">
          <div className="hidden lg:block lg:w-1/4">
            <div className="mb-8"></div>
          </div>
          <main className="w-full lg:w-2/4 lg:px-8 mb-8 pb-8 border-b lg:border-none">
            <BlogList searchParams={searchParams} />
          </main>
          <div className="w-full lg:w-1/4">
            <div className="mb-8">
              {/* 広告 */}
              <div className="mb-8">
                <Ad3 />
              </div>

              <h2 className="text-lg mb-4 tracking-widest">
                このブログについて
              </h2>
              <div className="">
                <p>
                  こんにちは！月(ライト)です。
                  Supatradeは、元金30万円からスタートし1億円を目指している投資ブログです。日々のデイトレードの成績や、失敗・反省を記録しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Suspense>

      <Footer />
    </div>
  );
};

export default Page;
