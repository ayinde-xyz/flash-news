import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";
const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // Grapql query
  const query = gql`
    query MyQuery {
      myQuery(
        access_key: "8b7efc5449208f64a44dc20735daa110"
        countries: "us, gb"
      ) {
        data {
          category
          country
          author
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          offset
          limit
          total
        }
      }
    }
  `;

  // fetch function with Next js 13 caching
  const res = await fetch(
    "https://malanville.stepzen.net/api/tan-cricket/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 30 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `APIkey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );

  const newsResponse = await res.json();
  // sort function of images
  const news = sortNewsByImage(newsResponse.data.myQuery);
  // return res
  return news;
};
export default fetchNews;
