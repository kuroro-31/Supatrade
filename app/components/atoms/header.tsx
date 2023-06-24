"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useStore } from "../../../store";
import BlogNewButton from "../blog/blog-new-button";

/*
|--------------------------------------------------------------------------
| ナビゲーション
|--------------------------------------------------------------------------
*/
const Header = () => {
  const { user } = useStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header>
      <div className="bg-white dark:bg-dark w-full flex-none border-b border-comiee">
        <div className="max-w-8xl mx-auto">
          <div className="py-4 lg:px-8 lg:border-0 mx-4 lg:mx-0">
            <div className="relative flex items-center">
              {/* ロゴ */}
              <Link
                href="/"
                className="flex-none md:overflow-hidden md:w-auto"
                passHref
              >
                <span className="sr-only">
                  Startrade - Stock Trading Social Networking Service
                </span>
                <h1 className="dark:text-white">
                  {/* <Logo /> */}
                  <Image src="/logo.png" width={170} height={30} alt="" />
                </h1>
              </Link>

              {/* メニュー */}
              <div className="flex items-center md:ml-auto">
                <div className="hidden lg:flex items-center">
                  <nav className="text-sm">
                    <div className="flex items-center">
                      {isClient &&
                        (user ? (
                          <div className="flex items-center">
                            <BlogNewButton />
                            <Link href="/auth/profile" className="ml-4">
                              プロフィール
                            </Link>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Link href="/auth/login" className="btn-primary">
                              ログイン
                            </Link>
                            <Link
                              href="/auth/signup"
                              className="ml-4 hover:text-primary dark:hover:text-f5"
                            >
                              新規登録
                            </Link>
                          </div>
                        ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
