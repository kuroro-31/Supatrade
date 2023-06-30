import Login from '../../components/auth/login';

export const metadata = {
  title: "ログイン | Supatrade",
  metadataBase: new URL("https://www.supatrade.trade/auth/login"),
};

// サインアップ
const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
