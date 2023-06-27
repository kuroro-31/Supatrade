"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createRef, FormEvent, useCallback, useRef, useState } from "react";

import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { useStore } from "../../../store";
import Loading from "../../loading";
import MyPagenation from "../pagination";
import { useSupabase } from "../supabase-provider";
import BlogLike from "./blog-like";

import type { BlogDetailType, CommentType } from "../../../types/blog.types";
type PageProps = {
  blog: BlogDetailType;
  login: boolean;
};

// コメント
const BlogComment = ({ blog, login }: PageProps) => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const { user } = useStore();
  const [loadingComment, setLoadingComment] = useState(false);
  const [loadingDeleteComment, setLoadingDeleteComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [offset, setOffset] = useState(0);
  const scrollRef = createRef<HTMLDivElement>();
  const commentRef = useRef<HTMLTextAreaElement>(null!);
  const perPage = 3; // 1ページのコメント数

  // コメント送信
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingComment(true);

    if (!commentId) {
      // コメントを新規作成
      const { error: insertError } = await supabase.from("comments").insert({
        content: commentRef.current.value,
        blog_id: blog.id,
        profile_id: user?.id!,
      });

      // エラーチェック
      if (insertError) {
        alert(insertError.message);
        setLoadingComment(false);
        return;
      }
    } else {
      // コメントを編集
      const { error: updateError } = await supabase
        .from("comments")
        .update({
          content: commentRef.current.value,
        })
        .eq("id", commentId);

      // エラーチェック
      if (updateError) {
        alert(updateError.message);
        setLoadingComment(false);
        return;
      }
    }

    // コメント編集クリア
    setCommentId("");

    // フォームクリア
    commentRef.current.value = "";

    // キャッシュクリア
    router.refresh();

    setLoadingComment(false);
  };

  // コメント投稿フォームにスクロール
  const scrollToComment = useCallback(() => {
    scrollRef!.current!.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [scrollRef]);

  // コメント削除
  const deleteComment = async (comment_id: string) => {
    setLoadingDeleteComment(comment_id);
    await supabase.from("comments").delete().match({ id: comment_id });
    setLoadingDeleteComment("");

    // キャッシュクリア
    router.refresh();
  };

  // コメント編集
  const editComment = (comment_id: string, content: string) => {
    setCommentId(comment_id);
    commentRef.current.value = content;
    scrollToComment();
  };

  // コメント編集取り消し
  const editCancelComment = () => {
    setCommentId("");
    commentRef.current.value = "";
  };

  // コメントページネーション
  const paginationHandler = ({ selected }: { selected: number }): void => {
    setOffset(selected * perPage);
  };

  // コメント編集削除ボタン
  const renderEditDelete = (data: CommentType) => {
    // 自身のコメントチェック
    if (login && data.profiles.id == user?.id) {
      return (
        <div className="text-sm flex items-center space-x-2 pl-2">
          <div
            className="cursor-pointer"
            onClick={() => editComment(data.id, data.content)}
          >
            <PencilSquareIcon className="h-5 w-5 text-green-500 hover:brightness-110" />
          </div>

          {loadingDeleteComment == data.id ? (
            <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => deleteComment(data.id)}
            >
              <TrashIcon className="h-5 w-5 text-red-500 hover:brightness-110" />
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      {login && (
        <div className={`my-8`}>
          <div className="mb-3" ref={scrollRef}>
            {!commentId ? (
              <div className="font-bold">コメントする</div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="font-bold">コメントを編集する</div>
                <div
                  className="text-sm text-red-500 cursor-pointer"
                  onClick={editCancelComment}
                >
                  <XCircleIcon className="h-7 w-7 text-red-500" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <textarea
                className="w-full rounded border py-1 px-3 outline-none focus:ring-2 focus:ring-primary"
                rows={5}
                ref={commentRef}
                id="comment"
                required
              />
            </div>
            <div className="text-right">
              {loadingComment ? (
                <Loading />
              ) : (
                <button type="submit" className="btn">
                  {!commentId ? "投稿" : "編集"}
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="my-8">
        <div className=" flex items-center justify-between p-3">
          <div className="font-bold">コメント</div>
          <div>{blog.comments.length}人</div>
        </div>

        {blog.comments.slice(offset, offset + perPage).map((data, index) => (
          <div
            key={data.id}
            className={blog.comments.length - 1 === index ? "" : "border-b"}
          >
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center space-x-2">
                <Image
                  src={
                    data.profiles.avatar_url
                      ? data.profiles.avatar_url
                      : "/default.png"
                  }
                  className="rounded-full"
                  alt="avatar"
                  width={30}
                  height={30}
                />
                <div className="">{data.profiles.name}</div>
              </div>
              <div className="text-sm text-gray-500">
                {format(new Date(data.created_at), "yyyy/MM/dd HH:mm")}
              </div>
            </div>
            <div className="leading-relaxed break-words whitespace-pre-wrap p-3">
              {data.content}
            </div>

            <div className="flex items-center justify-end px-3 mb-3">
              <div className="flex items-center space-x-1">
                <BlogLike data={data} login={login} />
                <div>{data.likes.length}</div>
                {renderEditDelete(data)}
              </div>
            </div>
          </div>
        ))}

        {blog.comments.length != 0 && (
          <div className="flex justify-center items-center my-5">
            <MyPagenation
              allCnt={blog.comments.length}
              perPage={perPage}
              clickPagenation={paginationHandler}
            />
          </div>
        )}

        {blog.comments.length == 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            コメントはまだありません
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogComment;
