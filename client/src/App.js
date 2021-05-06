import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './pages/profile/Profile';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          Register
        </Route>

        <Route path="/profile/:id">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
