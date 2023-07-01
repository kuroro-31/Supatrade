import Login from "../../components/auth/login";

export const metadata = {
  title: "ログイン | Supatrade",
  alternates: {
    canonical: "/auth/login",
  },
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
