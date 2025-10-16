import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News';
//Using React-Router To Display Various Section
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
//Loading bar
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  //Ajdust the pagesize
  pageSize = 10;
  apiKey = process.env.REACT_APP_NEWS_API;

  //Progress Initiallt set As Zero Then Is set As Req When used as props
  state = {
    progress: 0
  }
  setprogress = (progress) => {
    this.setState({ progress: progress })
  }

  //Compile JSX with html And Then Render The Class {}
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          {/* Loading Bar*/}
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} category='general' />} />
            <Route exact path="/business" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} category='business' />} />
            <Route exact path="/entertainment" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} category='entertainment' />} />
            <Route exact path="/health" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} category='health' />} />
            <Route exact path="/science" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} category='science' />} />
            <Route exact path="/sports" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} category='sports' />} />
            <Route exact path="/technology" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} category='technology' />} />
          </Routes>


        </Router>
      </div>
    )
  }
}

