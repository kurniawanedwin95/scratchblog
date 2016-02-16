import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.js';
import Summaries from './components/Summaries.js';
import Post from './components/Post.js';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Summaries } />
    <Route path=":user" component={ Summaries } />
    <Route path="post/:id" component={ Post } />
    <Route path=":user/post/:id" component={ Post } />
  </Route>
);

export default routes;
