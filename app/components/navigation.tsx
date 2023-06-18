"use client"; // 認証判定で使用

import Link from "next/link";

import useStore from "../../store";
import Logo from "../components/atoms/header/logo";

/*
|--------------------------------------------------------------------------
| ナビゲーション
|--------------------------------------------------------------------------
*/
const Navigation = () => {
  const { user } = useStore();

  return (
    <header>
      <div className="bg-white dark:bg-dark w-full flex-none border-b border-comiee">
        <div className="max-w-8xl mx-auto">
          <div className="py-4 lg:px-8 lg:border-0 mx-4 lg:mx-0">
            <div className="relative flex items-center">
              <a
                href="/"
                className="mr-3 flex-none md:overflow-hidden md:w-auto"
              >
                <span className="sr-only">
                  Comiee - Manga Social Networking Service
                </span>
                <h1 className="text-2xl font-bold dark:text-white">
                  <Logo />
                </h1>
              </a>

              <div className="flex items-center md:ml-auto">
                <div className="hidden lg:flex items-center">
                  <nav className="text-sm">
                    <div className="flex items-center">
                      <div className="">
                        {user.id ? (
                          <div className="flex space-x-4">
                            <Link href="/auth/profile">プロフィール</Link>
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
                        )}
                      </div>
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

export default Navigation;
