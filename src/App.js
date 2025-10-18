import React, { useState } from 'react'
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

const App = () => {
  //Ajdust the pagesize
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API;

  //Progress Initiallt set As Zero Then Is set As Req When used as props

  const [progress, setprogress] = useState(0)

  //Compile JSX with html And Then Render The Class {}
  return (
    <div>
      <Router>
        <Navbar />
        {/* Loading Bar*/}
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setprogress={setprogress} apiKey={apiKey} key="general" pageSize={pageSize} category='general' />} />
          <Route exact path="/business" element={<News setprogress={setprogress} apiKey={apiKey} key="business" pageSize={pageSize} category='business' />} />
          <Route exact path="/entertainment" element={<News setprogress={setprogress} apiKey={apiKey} key="entertainment" pageSize={pageSize} category='entertainment' />} />
          <Route exact path="/health" element={<News setprogress={setprogress} apiKey={apiKey} key="health" pageSize={pageSize} category='health' />} />
          <Route exact path="/science" element={<News setprogress={setprogress} apiKey={apiKey} key="science" pageSize={pageSize} category='science' />} />
          <Route exact path="/sports" element={<News setprogress={setprogress} apiKey={apiKey} key="sports" pageSize={pageSize} category='sports' />} />
          <Route exact path="/technology" element={<News setprogress={setprogress} apiKey={apiKey} key="technology" pageSize={pageSize} category='technology' />} />
        </Routes>


      </Router>
    </div>
  )
}

export default App
