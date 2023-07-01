import Singup from "../../components/auth/signup";

export const metadata = {
  title: "アカウント登録 | Supatrade",
  alternates: {
    canonical: "/auth/signup",
  },
};

// サインアップ
const SingupPage = () => {
  return (
    <>
      <Singup />
    </>
  );
};

export default SingupPage;
