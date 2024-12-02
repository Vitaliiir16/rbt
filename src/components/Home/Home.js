import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Алгоритми та Структури Даних</h1>
      <div className="sections">
        <div className="section">
          <h2>Your Graph Algorithm</h2>
          <Link to="/graph">
            <button className="start-button">Start</button>
          </Link>
        </div>
        <div className="section">
          <h2>Your Data Structure</h2>
          <Link to="/red-black-tree">
            <button className="start-button">Start</button>
          </Link>
        </div>
      </div>
      <footer>
        <p>Internet of Things 2022</p>
      </footer>
    </div>
  );
}

export default Home;
