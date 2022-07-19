import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { QNHLesson } from './three/qnh/components/QNHLesson';
import { ThreeComponent } from './ThreeComponent'

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
