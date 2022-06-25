import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import Login from './login/login';
import Settings from './Settings/settings';

function App() {
  return (
    <Router>
      <main className="App">
        <Switch>
          <Route path={'/settings'}>
            <Settings/>
          </Route>
          <Route path={'/login'}>
            <Login />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;


