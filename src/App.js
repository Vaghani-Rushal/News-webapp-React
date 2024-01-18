import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Maintanance from "./components/Maintanance";
import Error from "./components/Error";

const App = () => {
  const [progress, setProgress] = useState(0);

  let category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  let pageSize = 6;

  let apiKey = process.env.REACT_APP_NEWS_API_1;
  // let apiKey = process.env.REACT_APP_NEWS_API_2;

  return (
    <>
      <Router>
        <Navbar />

        <LoadingBar color="#f11946" progress={progress} />

        <div className="container my-3">
          <Routes>
            <Route
              exect
              path="/"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  pageSize={pageSize}
                  country="in"
                  category="general"
                />
              }
            />

            <Route path="/about" element={<Maintanance />} />
            <Route path="/contact" element={<Maintanance />} />

            {category &&
              category.map((element) => {
                return (
                  <Route
                    key={element}
                    exect
                    path={`/category/${element}`}
                    element={
                      <News
                        key={element}
                        setProgress={setProgress}
                        apiKey={apiKey}
                        pageSize={pageSize}
                        country="in"
                        category={element}
                      />
                    }
                  />
                );
              })}

            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
