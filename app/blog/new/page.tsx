import Footer from "../../components/atoms/footer";
import Header from "../../components/atoms/header";
import BlogNew from "../../components/blog/blog-new";

export const metadata = {
  title: "新規作成 | Supatrade",
  metadataBase: new URL("https://www.supatrade.trade/blog/new"),
};

// ブログ作成ページ
const BlogNewPage = () => {
  return (
    <div className="">
      <Header />
      <BlogNew />
      <Footer />
    </div>
  );
};

export default BlogNewPage;
