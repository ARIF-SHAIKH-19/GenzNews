import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    // Initializes the component's state.
    const [articles, setAricles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

    //Capitalize the String As Used Above
    const stringCaptilize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //It Fetch data from the Url In .json() Format Then setState() is Used To set State
    const newsUbdate = async () => {
        props.setprogress(0);
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setprogress(70);
        setAricles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setprogress(100);
    }

    //-Called after the component is mounted in the DOM.Perfect place to fetch data from APIs.

    useEffect(() => {
        newsUbdate();
        document.title = `${stringCaptilize(props.category)} - GenzNewz`;
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        //- Appends the new articles to the existing ones using .concat().
        setAricles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    };

    //-render() : Runs next to display the initial UI.- At this point, articles is still empty, so it shows the spinner.
    //Once newsUbdate() updates the state: React sees the state has changed. It re-runs render() to show the updated articles instead of the spinner. 
    return (
        <>
            <h2 className='mt-3 text-center'>GenzNews - The Top Headlines From {stringCaptilize(props.category)}</h2>
            <div className="container">
                {/* Shows Spinner Till The screen Is Loading */}
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    // -If the number of loaded articles equals totalResults, it stops fetching.
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element, index) => {

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
//Setting Default props & The type of Props
News.defaultProps = {
    pageSize: 10,
    category: 'general'
}
News.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
