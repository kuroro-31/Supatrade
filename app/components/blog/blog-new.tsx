import { FormEvent, useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "../../../store";
import Footer from "../atoms/footer";
import Header from "../atoms/header";
import { useSupabase } from "../supabase-provider";

// ブログ新規投稿
const BlogNew = () => {
  const { supabase } = useSupabase();
  const { user } = useStore();
  const titleRef = useRef<HTMLInputElement>(null!);
  const contentRef = useRef<HTMLTextAreaElement>(null!);
  const [image, setImage] = useState<File>(null!);
  const [loading, setLoading] = useState(false);

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
      // supabaseストレージに画像アップロード
      const { data: storageData, error: storageError } = await supabase.storage
        .from("blogs")
        .upload(`${user.id}/${uuidv4()}`, image);

      if (storageError) {
        alert(storageError.message);
        setLoading(false);
        return false;
      }

      // 画像URL取得
      const { data: urlData } = await supabase.storage
        .from("blogs")
        .getPublicUrl(storageData.path);

      // ブログデータを新規作成
      const { error: insertError } = await supabase.from("blogs").insert({
        title: titleRef.current.value,
        content: contentRef.current.value,
        image_url: urlData.publicUrl,
        profile_id: user.id,
      });

      if (insertError) {
        alert(insertError.message);
        setLoading(false);
        return false;
      }

      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  return (
    <div className="">
      <Header />
      <div className="max-w-screen-md mx-auto p-8">
        <form onSubmit={onSubmit}>{/* form content */}</form>
      </div>
      <Footer />
    </div>
  );
};

export default BlogNew;
