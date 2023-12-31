"use client";
import MyPagenation from "../pagination";

type PageProps = {
  allCnt: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

// ブログページネーション
const BlogPagination = ({ allCnt, perPage, onPageChange }: PageProps) => {
  const paginationHandler = ({ selected }: { selected: number }): void => {
    onPageChange(selected + 1);
  };
  return (
    <MyPagenation
      allCnt={allCnt}
      perPage={perPage}
      clickPagenation={paginationHandler}
    />
  );
};

export default BlogPagination;
