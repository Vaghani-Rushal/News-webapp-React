import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

    setLoading(true);

    let data = await fetch(url);
    let parsedData = await data.json();

    setLoading(false);
    setArticles(articles.concat(parsedData.articles));
    setPage(page + 1);
  };

  useEffect(() => {
    document.title = `NewsMonkey - ${capitalizeFirstLetter(
      props.category
    )} News`;
    updateNews();
    // eslint disable next line
  }, []);

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    props.setProgress(40);
    let data = await fetch(url);

    props.setProgress(70);
    let parsedData = await data.json();

    setLoading(false);
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);

    props.setProgress(100);
  };

  return (
    <>
      <div className="my-3">
        <h1 className="text-center" style={{ marginTop: "70px" }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} HeadLines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Spinner />}
        >
          <div className="container row row-cols-1 row-cols-md-3 g-4 mt-1">
            {articles &&
              articles.map((element) => {
                return (
                  element.title &&
                  element.description &&
                  element.urlToImage &&
                  element.url && (
                    <div key={element.title} className="col">
                      <NewsItem
                        title={element.title.slice(0, 90) + "..."}
                        description={
                          element.description.slice(0, 130) + ". . ."
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={new Date(element.publishedAt)}
                        source={element.source.name}
                      />
                    </div>
                  )
                );
              })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
  // apiKey: "ef4786a1add944aca6230f269f8a2f3b",
  // apiKey: "1453c2283ccb41eeb252edcc1a8ed33a",
};

export default News;
