import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { Explore } from './pages/Explore';
import { Home } from './pages/Home';

import { Header } from './cmps/Header';

function App() {

  const stays = [
    {
      name: 'aaaa',
      ctg: 'sea',
      rete: 4.5,
      price: 80,
      imgUrl: 'https://a0.muscache.com/im/pictures/a6a9afa4-0b39-4b9d-aff7-83148cc3b941.jpg?im_w=720'
    },
    {
      name: 'bbb',
      ctg: 'city',
      rete: 4.8,
      price: 90,
      imgUrl: 'https://a0.muscache.com/im/pictures/db09f7f8-8790-487a-995a-b34ce29cc343.jpg?im_w=720'
    },
    {
      name: 'aaaa',
      ctg: 'country',
      rete: 3.5,
      price: 45,
      imgUrl: 'https://a0.muscache.com/im/pictures/dcaddcb2-703d-4b36-9e48-47cc2a3d72a0.jpg?im_w=720'
    },
  ]


  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/stay/:stayId' component={StayDetails} />
        <Route path='/explore' render={() => (<Explore stays={stays} />)} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
