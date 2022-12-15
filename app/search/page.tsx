import React from "react";
import fetchNews from "../../lib/fetchNews";
import NewsList from "../NewsList";
type Props = {
  searchParams?: { term: string };
};

const SearchPage = async ({ searchParams }: Props) => {
  const news: any = await fetchNews("general", searchParams?.term, true);
  return (
    <div>
      <h1 className="headerTitle">Search Results For: {searchParams?.term}</h1>
      <NewsList news={news} />
    </div>
  );
};

export default SearchPage;
