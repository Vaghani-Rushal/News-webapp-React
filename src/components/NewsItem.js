import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <>
        <div className="card" style={{ height: "30rem" }}>
          <span
            className="position-absolute top-0 end-0 translate-middle-y badge rounded-pill bg-info"
            style={{ zIndex: "1" }}
          >
            {source ? source : "Unknown"}
          </span>
          <img
            alt=""
            src={imageUrl}
            className="card-img-top"
            style={{ height: "12rem" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"}{" "}
              </small>
              <br />
              <small className="text-body-secondary">
                on {date.toGMTString()}{" "}
                {date.getDate() === new Date().getDate() - 1 ? (
                  <span className="badge bg-primary">New</span>
                ) : (
                  ""
                )}
                {date.getDate() === new Date().getDate() ? (
                  <span className="badge bg-danger">Latest</span>
                ) : (
                  ""
                )}
              </small>
            </p>

            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-primary position-absolute bottom-0 start-0 mb-3 mx-3"
            >
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
