import { useState, useEffect } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import InsertBook from './pages/InsertBook';
import ViewWords from './pages/ViewWords';
import WordGroups from './pages/WordGroups';
import SearchByPhrase from './pages/SearchByPhrase';
import Search from './pages/Search';
import Header from '../src/components/Header';
import Statistics from './pages/Statistics';

const App = () => {
  return (
    <div className="app d-flex flex-row">
      <div className="app-container">
        <Header />
        <Switch>
          <div className="app-wrap container">
            <Route exact path="/" component={() => <InsertBook />} />
            <Route exact path="/searchbyword" component={() => <ViewWords />} />
            <Route exact path="/word-groups" component={() => <WordGroups />} />
            <Route exact path="/searchbyphrase" component={() => <SearchByPhrase />} />
            <Route exact path="/search" component={() => <Search />} />
            <Route exact path="/statistics" component={() => <Statistics />} />
          </div>
        </Switch>
      </div>
    </div>
  );
};

export default App;
