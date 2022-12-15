"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  article: Article;
};

const ReadMoreButton = ({ article }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    const queryString = Object.entries(article)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `/article?${queryString}`;
    router.push(url);
  };
  return (
    <button
      className="bg-orange-400 h-10 rounded-b-lg dark:text-gray-500 hover:bg-orange-500"
      onClick={handleClick}>
      ReadMoreButton
    </button>
  );
};

export default ReadMoreButton;
