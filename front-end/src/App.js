import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './home/home';
import GameBoard from './gameboard/gameboard';

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
            </ul>
          </nav>
        </div>
        
        <Routes>
          <Route path="/game/:id" element={<GameBoard />} component={GameBoard} />
          <Route exact path="/" element={<Home />} component={Home} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
