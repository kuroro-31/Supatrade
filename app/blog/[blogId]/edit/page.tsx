// BlogEditPage.tsx
import Footer from "../../../components/atoms/footer";
import Header from "../../../components/atoms/header";
import BlogEditForm from "../../../components/blog/edit/BlogEditForm";

const BlogEditPage = ({ blog }: { blog: any }) => {
  return (
    <div className="">
      <Header />
      <BlogEditForm blog={blog} />
      <Footer />
    </div>
  );
};

export default BlogEditPage;
