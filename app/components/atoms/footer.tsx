"use client";

/*
|--------------------------------------------------------------------------
| フッター
|--------------------------------------------------------------------------
*/
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full mb-16 md:mb-0 bg-f8 py-8 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row pb-8 md:pb-12 px-8 md:px-0 border-b border-[#ccc]">
        <div className="md:w-2/5 flex flex-col items-start">
          <Image
            src="/logo.png"
            alt="Supatrade Logo"
            width={250}
            height={40}
            className="h-[35px] md:h-[40px]"
          />
        </div>
        <div className="md:w-3/5 mt-8 md:mt-0 flex flex-col">
          <div className="w-full flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2">
              <div className="tracking-widest text-xl mb-4 cursor-default">
                ヘルプ
              </div>
              <a
                href="/about/supatrade"
                className="block mb-2 hover:text-primary"
              >
                Supatradeについて
              </a>
              <a href="/user_guide" className="block mb-2 hover:text-primary">
                ご利用ガイド
              </a>
              <a href="/faq?number=1" className="block mb-2 hover:text-primary">
                よくあるご質問
              </a>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="tracking-widest text-xl mb-4 cursor-default">
                利用規約とポリシー
              </div>
              <a
                href="/terms_of_service"
                className="block mb-2 hover:text-primary"
              >
                利用規約
              </a>
              <a
                href="/privacy_policy"
                className="block mb-2 hover:text-primary"
              >
                プライバシーポリシー
              </a>
              <a href="/sct" className="block mb-2 hover:text-primary">
                特定商取引法に基づく表記
              </a>
            </div>
          </div>
          <div className="mt-8 w-full flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2">
              <div className="tracking-widest text-xl mb-4 cursor-default">
                ニュース
              </div>
              <span className="block mb-2 hover:text-primary">
                お知らせ(準備中)
              </span>
              <a href="/release_note" className="block mb-2 hover:text-primary">
                リリースノート
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="md:max-w-5xl mx-auto mt-8 md:mt-16 flex flex-col-reverse md:flex-row justify-between items-center">
        <div className="md:w-2/5 mt-8 md:mt-0 tracking-widest cursor-default">
          &copy;
          {new Date().getFullYear()}
          <span className="ml-2">Supatrade</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
