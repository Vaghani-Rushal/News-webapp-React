import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  pageSize = 6;

  apiKey = process.env.REACT_APP_NEWS_API_1;
  // apiKey = process.env.REACT_APP_NEWS_API_2;

  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <>
        <Router>
          <Navbar />

          <LoadingBar color="#f11946" progress={this.state.progress} />

          <div className="container my-3">
            <Routes>
              <Route
                exect
                path="/"
                element={
                  <News
                    key="home"
                    setProgress={this.setProgress}
                    apiKey={this.apiKey}
                    pageSize={this.pageSize}
                    country="in"
                    category="general"
                  />
                }
              />

              {this.category &&
                this.category.map((element) => {
                  return (
                    <Route
                      exect
                      path={`/category/${element}`}
                      element={
                        <News
                          key={element}
                          setProgress={this.setProgress}
                          apiKey={this.apiKey}
                          pageSize={this.pageSize}
                          country="in"
                          category={element}
                        />
                      }
                    />
                  );
                })}
            </Routes>
          </div>
        </Router>
      </>
    );
  }
}
