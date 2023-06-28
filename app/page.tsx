"use client";

import Link from "next/link";
import { Suspense } from "react";

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
            <div className="mb-8">
              <h2 className="text-lg mb-4 tracking-widest">
                世界の主要株価指数
              </h2>
              <div className="flex flex-col leading-8">
                <Link
                  href="https://www.google.com/finance/quote/NI225:INDEXNIKKEI"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-primary"
                >
                  日経平均株価
                </Link>
              </div>
              <div className="flex flex-col leading-8">
                <Link
                  href="https://www.google.com/finance/quote/TOPIX:INDEXTOPIX"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-primary"
                >
                  TOPIX
                </Link>
              </div>
              <div className="flex flex-col leading-8">
                <Link
                  href="https://www.google.com/finance/quote/.DJI:INDEXDJX"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-primary"
                >
                  ダウ平均株価
                </Link>
              </div>
              <div className="flex flex-col leading-8">
                <Link
                  href="https://www.google.com/finance/quote/.IXIC:INDEXNASDAQ"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-primary"
                >
                  ナスダック総合指数
                </Link>
              </div>
            </div>
          </div>
          <main className="w-full lg:w-2/4 lg:px-8 mb-8 pb-8 border-b lg:border-none">
            <BlogList searchParams={searchParams} />
          </main>
          <div className="w-full lg:w-1/4">
            <div className="mb-8">
              <h2 className="text-lg mb-4 tracking-widest">
                Supatradeについて
              </h2>
              <div className="">
                <p>
                  Supatradeは、Pythonによるテクニカル分析を用いた日本株の株価変動の「兆し」の情報を共有しているプラットフォームです。
                </p>
                <p>
                  オススメのご利用方法は、「買い」銘柄のファンダメンタル分析を行いタイミングを判断することです。
                  株価の上昇を保証するものではありませんので、責任は負いかねます。ご注意ください。
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
