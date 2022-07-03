import React from 'react'
import './App.css'
import { QNHLesson } from './three/qnh/components/QNHLesson';
import { ThreeComponent } from './ThreeComponent'

function App() {
  return (
    <div className="App">
      <ThreeComponent>
        {
          (scene) => <QNHLesson scene={scene} />
        }
      </ThreeComponent>
    </div>
  );
}

export default App;
