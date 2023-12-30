import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

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
  pageSize = 9;

  render() {
    return (
      <>
        <Router>
          <Navbar />

          <div className="container my-3">
            <Routes>
              <Route
                exect
                path="/"
                element={
                  <News key="home" pageSize={this.pageSize} country="in" />
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
