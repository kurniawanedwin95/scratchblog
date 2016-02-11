import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App.js';
import createHistory from 'history/lib/createHashHistory';
import { Router } from 'react-router';
import routes from './routes.js';

ReactDOM.render(
  <Router history={createHistory({ queryKey: false })}
    onUpdate={() => window.scrollTo(0, 0)}>
    {routes}
  </Router>,
  document.getElementById('app')
);
