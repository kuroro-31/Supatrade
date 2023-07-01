import { createClient } from "../../../types/supabase-browser";
import BlogPage from "../../components/blog/blog-page";

type PageProps = {
  params: {
    blogId: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: {
    blogId: string;
  };
}) {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("blogs")
      .select("id, title, content")
      .eq("id", params.blogId)
      .single();

    if (!data)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: data.title,
      description: data.content,
      alternates: {
        canonical: `/blog/${data.id}`,
      },
      openGraph: {
        title: `${data.title} | Supatrade`,
        description: `${data.content}`,
        // images: [
        //   {
        //     url: "https://www.supatrade.trade/ogp.png",
        //     width: 800,
        //     height: 600,
        //   },
        //   {
        //     url: "https://www.supatrade.trade/ogp.png",
        //     width: 1800,
        //     height: 1600,
        //     alt: "Supatrade Image Alt",
        //   },
        // ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${data.title} | Supatrade`,
        description: `${data.content}`,
        // images: ["hhttps://www.supatrade.trade/ogp.png"],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

// ブログ詳細
const BlogDetailPage = ({ params }: PageProps) => {
  return (
    <>
      <BlogPage blogId={params.blogId} />
    </>
  );
};
export default BlogDetailPage;
