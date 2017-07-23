'use strict';

let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let Link = ReactRouter.Link;
let IndexRoute = ReactRouter.IndexRoute;
let createBrowserHistory = require('history/lib/createBrowserHistory');

let Index = require('./components/Index/Index.jsx');
let Search = require('./components/Search/Search.jsx');
let NotFound = require('./components/NotFound/NotFound.jsx');

const App = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

const routeConfig = {
  path: '/',
  component: App,
  indexRoute: { component: Index },
  childRoutes: [
    {
      path: 'index',
      component: Index
    },
    {
      path: 'search',
      component: Search,
      childRoutes: [
        {
          path: 'message/:id',
          component: Search,
        }
      ],
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
};

ReactDOM.render(
  <Router history={createBrowserHistory()} routes={routeConfig} />,
  document.getElementById('wrap')
);
