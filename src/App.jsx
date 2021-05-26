import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { Explore } from './pages/Explore';
// import { StayDetails } from './pages/StayDetails
import { Home } from './pages/Home';
import data from '../src/data/data.json'

import { Header } from './cmps/Header';

function App() {

  // console.log(stay);
  const stays = data.stay;
  const stay=stays[0]
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/stay/:stayId' component={StayDetails} />
        <Route path='/explore' render={() => (<Explore stays={stays} />)} />
        <Route path='/stay' render={() => (<StayDetails stay={stay} />)} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
