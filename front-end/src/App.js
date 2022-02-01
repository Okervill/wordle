import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './home/home';
import Game from './game/game';

import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <div className='nav-container'>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/game">Game</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/game" element={<Game />} component={Game} />
            <Route exact path="/" element={<Home />} component={Home} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
