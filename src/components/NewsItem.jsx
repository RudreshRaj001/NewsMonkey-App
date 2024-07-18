import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, Author, date ,Source } = this.props;
    return (
      <div>
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: "50%", zIndex: "1"}}>
            {Source}
          </span>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://www.livemint.com/lm-img/img/2024/07/16/1600x900/gfa7f18fbca371ef39a0a67ad2e2294b85e5e3f4ebefc61687_1721102954516_1721102954679.jpg"
            }
            className="card-img-top"
            alt="..."
            style={{ height: "171px", minWidth: "286px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description
                ? description
                : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia ratione explicabo earum. Ratione"}
              ...
            </p>
            <p className="card-text">
              <small className="text-muted">
                By {Author ? Author : "Unknown"} <br /> on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
