import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn/SignIn';


function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path = "/">
          <LandingPage />
        </Route>

        <Route path = "/signin">
          <SignIn />
        </Route>

      </Switch>
      </div>
    </Router>
  );
}

export default App;