import React, {Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/header/header';

const HomePage = React.lazy(() => import('./pages/home/home'));
const CardDetailsPage = React.lazy(() => import('./pages/card-details/card-details'));
const ExplorerPage = React.lazy(() => import('./pages/explorer/explorer'));

function App() {
  return (
    <div className="App">
      <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/explorer" component={ExplorerPage} />
          <Route path="/card-details/:id" component={CardDetailsPage} />
        </Switch>
      </Suspense>
    </Router>
    </div>
  );
}

export default App;
