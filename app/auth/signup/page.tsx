import Singup from '../../components/auth/signup';

export const metadata = {
  title: "アカウント登録 | Supatrade",
  metadataBase: new URL("https://www.supatrade.trade/auth/signup"),
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
