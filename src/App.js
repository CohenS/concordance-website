import "./App.scss";
import React from 'react';
import { Route  } from "react-router-dom";
import InsertBook from './pages/InsertBook';
import WordGroups from './pages/WordGroups';
import ChangeWordGroup from './pages/ChangeWordGroups';
import SearchByLocation from './pages/WordLocationSearch';


import SearchByPhrase from './pages/SearchByPhrase';
import Search from './pages/Search';
import Header from '../src/components/Header';
import Statistics from './pages/Statistics';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

const SearchTextInBook = React.lazy(() => import('./pages/SearchTextInBook'));
const ViewWords = React.lazy(() => import('./pages/ViewWords'));

const App = () => {
  return (
    <div className="app d-flex flex-row">
      <div className="app-container">
        <Header />
        <CacheSwitch>
          <div className="app-wrap container">
            <CacheRoute  exact path="/" component={() => 
              <React.Suspense fallback={<>...</>}><InsertBook /> </React.Suspense>} 
            />
            <Route path="/searchTextInBook/:inputBookName?/:inputSearchTerm?/:inputSearchIndex?" 
              component={() => <React.Suspense fallback={<>...</>}> <SearchTextInBook />  </React.Suspense>} 
            />
            <CacheRoute  exact path="/searchbyword" component={() =>  <React.Suspense fallback={<>...</>}><ViewWords /> </React.Suspense>} />
            <CacheRoute  exact path="/word-groups" component={() => <WordGroups />} />
            <CacheRoute  exact path="/searchbyphrase" component={() => <SearchByPhrase />} />
            <CacheRoute  exact path="/searchbylocation" component={() => <SearchByLocation />} />
            <CacheRoute  exact path="/changewordgroup" component={() => <ChangeWordGroup />} />


            <CacheRoute  exact path="/search" component={() => <Search />} />
            <CacheRoute  exact path="/statistics" component={() => <Statistics />} />
            
          </div>
        </CacheSwitch>
      </div>
    </div>
  );
};

export default App;
