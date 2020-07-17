import React from 'react';
import login from './components/login'
import register from './components/register'
import home from './components/home'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import AuthenticatedComponent from './components/AuthenticatedComponent';
import posts from './components/posts';

function App() {
  return (
    <>
    <Router>
    <Switch>
      <Route path="/" component={home} exact/>
      <Route path="/login" component={login} />
      <Route path="/register" component={register} />
      <AuthenticatedComponent>
      <Route path="/posts" component={posts} />
      </AuthenticatedComponent>
    </Switch>
    </Router>
    </>
  );
}

export default App;
