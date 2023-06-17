"use client"; // 認証判定で使用

/*
|--------------------------------------------------------------------------
| エラー画面
|--------------------------------------------------------------------------
*/
const Error = () => {
  return (
    <div>
      <div className="text-center text-5xl font-bold mb-3">500</div>
      <div className="text-center text-xl font-bold">Server Error</div>
    </div>
  );
};

export default Error;
