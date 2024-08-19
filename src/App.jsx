// src/App.js
import React from 'react';
import { DashboardProvider } from './DashboardContext';
import Dashboard from './Dashboard';
import './app.css';
function App() {
  return (
    <DashboardProvider>
      <div className="App">
        <Dashboard />
      </div>
    </DashboardProvider>
  );
}

export default App;
