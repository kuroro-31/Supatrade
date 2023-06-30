import Profile from '../../components/auth/profile';

export const metadata = {
  title: "プロフィール | Supatrade",
  metadataBase: new URL("https://www.supatrade.trade/auth/profile"),
};

// サインアップ
const ProfilePage = () => {
  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
