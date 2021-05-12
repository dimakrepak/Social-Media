import './App.css';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {currentUser ? <Home /> : <Login />}
          {/* <Home /> */}
        </Route>

        <Route path="/login">
          {currentUser ? <Redirect to="/" /> : <Login />}
          {/* <Login /> */}
        </Route>

        <Route path="/register">
          {currentUser ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/profile/:id">
          {currentUser ? <Profile /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
