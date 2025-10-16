import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    //Setting Default props & The type of Props
    static defaultProps = {
        pageSize: 10,
        category: 'general'
    }
    static propTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    //-constructor():Initializes the component's state.
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.stringCaptilize(this.props.category)} - GenzNewz`;
    }

    //Capitalize the String As Used Above
    stringCaptilize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //It Fetch data from the Url In .json() Format Then setState() is Used To set State
    async newsUbdate() {
        this.props.setprogress(0);
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setprogress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setprogress(100);
    }

    //-Called after the component is mounted in the DOM.Perfect place to fetch data from APIs.
    async componentDidMount() {
        this.newsUbdate();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        //- Appends the new articles to the existing ones using .concat().
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    };

    //-render() : Runs next to display the initial UI.- At this point, articles is still empty, so it shows the spinner.
    //Once newsUbdate() updates the state: React sees the state has changed. It re-runs render() to show the updated articles instead of the spinner. 
    render() {
        return (
            <>
                <h2>GenzNews - The Top Headlines From {this.stringCaptilize(this.props.category)}</h2>
                <div className="container">
                    {/* Shows Spinner Till The screen Is Loading */}
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        // -If the number of loaded articles equals totalResults, it stops fetching.
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element, index) => {

                                    return <div className="col-md-4" key={index}>
                                        <NewsItem title={element.title ? element.title.slice(0, 48) : ""} description={element.description ? element.description.slice(0, 65) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}

export default News
