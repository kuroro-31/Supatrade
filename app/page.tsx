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
        <div className="container w-full flex flex-col lg:flex-row justify-between mx-auto py-6 lg:py-12 px-8 lg:px-20">
          <div className="hidden lg:block lg:w-1/4">
            {/* Supatradeは、株式投資の情報共有を目的としたSNSです。 */}
          </div>
          <main className="w-full lg:w-2/4 lg:px-8 mb-8 pb-8 border-b lg:border-none">
            <BlogList searchParams={searchParams} />
          </main>
          <div className="w-full lg:w-1/4">
            <div className="mb-8">
              <h2 className="text-lg mb-2 tracking-widest">
                Supatradeについて
              </h2>
              <div className="">
                <p>
                  Supatradeは、日本株の銘柄についての情報共有を目的としたSNSです。
                </p>
                <p>株式投資の情報収集にお役立てください。</p>
                <p>
                  ただし、株価の上昇を保証するものではありませんので、責任は負いかねます。ご注意ください。
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
