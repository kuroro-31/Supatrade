import { useStore } from "../../../../store";
import Footer from "../../../components/atoms/footer";
import Header from "../../../components/atoms/header";
import BlogEditForm from "../../../components/blog/edit/BlogEditForm";

const BlogEditPage = ({ blog }: { blog: any }) => {
  const { user } = useStore();

  useEffect(() => {
    // 自分が投稿したブログチェック
    if (user?.id !== blog.profile_id) {
      // ブログ詳細に遷移
      window.location.href = `/blog/${blog.id}`;
    }
  }, [user?.id, blog.profile_id, blog.id]);

  return (
    <div className="">
      <Header />
      <BlogEditForm blog={blog} />
      <Footer />
    </div>
  );
};

export default BlogEditPage;
function useEffect(arg0: () => void, arg1: any[]) {
  throw new Error("Function not implemented.");
}
