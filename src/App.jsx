import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { Explore } from './pages/Explore';
import { Home } from './pages/Home';

import { Header } from './cmps/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/stay/:stayId' exact component={StayDetails} />
        <Route path='/explore' exact component={Explore} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
