import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
    // apiKey: "ef4786a1add944aca6230f269f8a2f3b",
    // apiKey: "1453c2283ccb41eeb252edcc1a8ed33a",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // console.log("Constructor : News Component");
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(
      this.props.category
    )} News`;
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
    };
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      loading: false,
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page + 1,
    });
  };

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.props.setProgress(40);
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json();

    this.setState({
      loading: false,
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }

  render() {
    return (
      <>
        <div className="my-2">
          <h1 className="text-center">
            NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
            HeadLines
          </h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalArticles}
            loader={<Spinner />}
          >
            <div className="container row row-cols-1 row-cols-md-3 g-4 mt-1">
              {this.state.articles &&
                this.state.articles.map((element) => {
                  return (
                    element.title &&
                    element.description &&
                    element.urlToImage &&
                    element.url && (
                      <div className="col">
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
  }
}

export default News;
