"use client";
import { FormEvent, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "../../../store";
import { useSupabase } from "../supabase-provider";

import type { Database } from "../../../utils/database.types";

type Blog = Database["public"]["Tables"]["blogs"]["Row"];

type PageProps = {
  blog: Blog;
};

// ブログ編集
const BlogEdit = ({ blog }: PageProps) => {
  const { supabase } = useSupabase();
  const { user } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File>(null!);
  const [loading, setLoading] = useState(false);
  const [myBlog, setMyBlog] = useState(false);

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
        <div className="max-w-screen-md mx-auto">
          <form onSubmit={onSubmit}>{/* ...form fields... */}</form>
        </div>
      );
    }
  };

  return <>{renderBlog()}</>;
};

export default BlogEdit;
