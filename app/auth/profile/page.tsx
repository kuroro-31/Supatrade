import Profile from "../../components/auth/profile";

export const metadata = {
  title: "プロフィール | Supatrade",
  alternates: {
    canonical: "/auth/profile",
  },
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
