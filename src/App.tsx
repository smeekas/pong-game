import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Canvas from './components/Canvas/Canvas'
import SocketControls from './components/SocketControls/SocketControls'
import { pong } from './store/store'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SocketControls pong={pong}/>
      <Canvas />
    </div>
  )
}

export default App
