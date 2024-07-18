import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// 40ef1b2294c844cea6fe1ebf87e4347a
// 435c851623a24a21a17c1da86aaba532
// fad4c89261514286a64fa53738b1ddd3
export class News extends Component {
  // api = "fad4c89261514286a64fa53738b1ddd3";

  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("Hello I am a constructor");

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
    console.log(this.props.category);
  }

  async updateNews() {
    this.props.setProgress(10);
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40ef1b2294c844cea6fe1ebf87e4347a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    // console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });

    // console.log(this.state.page);
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // runs when the component is made

    // // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40ef1b2294c844cea6fe1ebf87e4347a&page=1&pageSize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });
    // document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false
    });
  };

  // handlePrevClick= async () => {
  //   // console.log("handlePrevClick");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40ef1b2294c844cea6fe1ebf87e4347a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // // console.log(parsedData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   // })
  //   this.setState({page: this.state.page - 1});
  //   this.updateNews();

  // }

  // handleNextClick = async () => {
  //   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
  //       console.log("handleNextClick");
  //       // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40ef1b2294c844cea6fe1ebf87e4347a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

  //       // this.setState({loading: true});
  //       // let data = await fetch(url);
  //       // let parsedData = await data.json();
  //       // // console.log(parsedData);

  //       // this.setState({
  //       //   page: this.state.page + 1,
  //       //   articles: parsedData.articles,
  //       //   loading: false
  //       // })
  //       this.setState({page: this.state.page + 1});
  //       this.updateNews();
  //   }
  // }

  render() {
    return (
      <>
        {/* <div className='container my-3'> */}
        <h2 className="text-center" style={{ margin: "40px" }}>
          News Monkey - Top Headlines : {this.props.category}
        </h2>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-3 my-3" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} Author={element.author} date={element.
publishedAt} Source={element.source.name}/>
          </div>
          })} */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3 my-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      Author={element.author}
                      date={element.publishedAt}
                      Source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-around">
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick}  className="btn btn-dark">next &rarr;</button>
        </div> */}

        {/* </div> */}
      </>
    );
  }
}

export default News;
