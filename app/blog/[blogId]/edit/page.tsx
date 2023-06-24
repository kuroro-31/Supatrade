"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "../../../../store";
import { supabase } from "../../../../utils/supabase-server";
import Footer from "../../../components/atoms/footer";
import Header from "../../../components/atoms/header";
import Loading from "../../../loading";

type PageProps = {
  blog: any;
  params: {
    blogId: string;
  };
};

// ブログ編集ページ
const BlogEditPage = ({ blog }: PageProps) => {
  const { user } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File>(null!);
  const [loading, setLoading] = useState(false);
  const [myBlog, setMyBlog] = useState(false);

  useEffect(() => {
    // 自分が投稿したブログチェック
    if (user?.id !== blog.profile_id) {
      // ブログ詳細に遷移
      window.location.href = `/blog/${blog.id}`;
    } else {
      // 初期値設定
      setTitle(blog.title);
      setContent(blog.content);
      setMyBlog(true);
    }
  }, [user?.id, blog.profile_id, blog.id, blog.title, blog.content]);

  // 画像アップロード
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files?.length == 0) {
        return;
      }
      setImage(files[0]);
    },
    []
  );

  // 送信
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (user?.id) {
      let image_url = blog.image_url;

      if (image) {
        // supabaseストレージに画像をアップロード
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("blogs")
            .upload(`${user.id}/${uuidv4()}`, image);

        if (storageError) {
          alert(storageError.message);
          setLoading(false);
          return;
        }

        // ファイル名取得
        const fileName = image_url.split("/").slice(-1)[0];

        // 古い画像を削除
        await supabase.storage.from("blogs").remove([`${user.id}/${fileName}`]);

        // 画像のURLを取得
        const { data: urlData } = supabase.storage
          .from("blogs")
          .getPublicUrl(storageData.path);

        image_url = urlData.publicUrl;
      }

      // ブログをアップデート
      const { error: updateError } = await supabase
        .from("blogs")
        .update({
          title,
          content,
          image_url,
        })
        .eq("id", blog.id);

      if (updateError) {
        alert(updateError.message);
        setLoading(false);
        return;
      }

      // ブログ詳細に遷移
      window.location.href = `/blog/${blog.id}`;
      window.location.reload();
    }

    setLoading(false);
  };

  // 自分が投稿したブログを表示
  const renderBlog = () => {
    if (myBlog) {
      return (
        <div className="">
          <Header />

          <div className="max-w-xl mx-auto p-8">
            <form onSubmit={onSubmit}>
              <div className="mb-5">
                <div className="text-sm mb-1">タイトル</div>
                <input
                  className="w-full p-4 border-transparent rounded bg-white dark:bg-dark-1 focus:border-[3px] focus:border-primary transition-all"
                  type="text"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-5">
                <div className="text-sm mb-1">画像</div>
                <input type="file" id="thumbnail" onChange={onUploadImage} />
              </div>

              <div className="mb-5">
                <div className="text-sm mb-1">内容</div>
                <textarea
                  className="w-full p-4 border-transparent rounded bg-white dark:bg-dark-1 focus:border-[3px] focus:border-primary transition-all"
                  id="                  content"
                  placeholder="Content"
                  rows={15}
                  value={content}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                  }
                  required
                />
              </div>

              <div className="text-center mb-5">
                {loading ? (
                  <Loading />
                ) : (
                  <button type="submit" className="btn">
                    編集
                  </button>
                )}
              </div>
            </form>
          </div>

          <Footer />
        </div>
      );
    }
  };

  return <>{renderBlog()}</>;
};

export default BlogEditPage;
