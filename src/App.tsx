import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { Popup } from './components/popup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Popup/>
    </div>
  )
}

export default App
