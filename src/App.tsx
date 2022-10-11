import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { Popup } from '@/components/popup'
import { Inventory } from '@/components/inventory'
import { selectCount, increment } from '@/features/counter/counterSlice'
import { useSelector, useDispatch } from 'react-redux';
function App() {
  const [knapsackVisible, setKnapsackVisible] = useState(true)
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <Popup close={() => {}}/>
      {knapsackVisible ?
        <Popup
          header={
            <>
              <span>header</span>
              <span className="cp" onClick={() => setKnapsackVisible(false)}>❌</span>
            </>}
          body={<Inventory size={[6,5]} />}
          close={(e: false) => setKnapsackVisible(e)}
        /> : ''}
      <div style={{width: '100vw',height: '100vh', background: '#eee'}}>
        <div onClick={() => {dispatch(increment())}}>{count}</div>
        {knapsackVisible}
      </div>
    </div>
  )
}

export default App
