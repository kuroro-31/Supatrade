"use client";

import Footer from "./components/atoms/footer";
import Header from "./components/atoms/header";

/*
|--------------------------------------------------------------------------
| データが存在しないときの画面
|--------------------------------------------------------------------------
*/
const NotFound = () => {
  return (
    <div>
      <Header />

      <div className="min-h-[80vh] flex justify-center items-center">
        <div>
          <div className="text-center text-8xl font-bold mb-8">404</div>
          <div className="text-center text-xl font-bold">
            ページが見つかりませんでした。
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
