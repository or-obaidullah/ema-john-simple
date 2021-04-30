import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Manage from './components/Manage/Manage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Review from './components/Review/Review';

function App() {
  return (
    <div >
      <Header></Header>
      <Router>
        <Switch>
          <Route path='/shop'>
            <Shop></Shop>
          </Route>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path='/manage'>
            <Manage></Manage>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <Route path='/product/:key'>
            <ProductDetails></ProductDetails>
          </Route>
          <Route path='*'> 
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
