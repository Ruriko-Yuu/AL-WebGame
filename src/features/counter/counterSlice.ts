import { createSlice, configureStore } from '@reduxjs/toolkit'
import localforage from 'localforage'

var saveData = localforage.createInstance({
  name: "saveData"
});

// saveData.setItem('key', 'value', () => {
//   console.log('saveData')
// })
saveData.getItem('key', (e) => {
  console.log(e)
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const store = configureStore({
  reducer: counterSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const incrementAsync = (amount: any) => (dispatch: (arg0: {
    payload: any;
    type: string;
  }) => void) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export const selectCount = (state: { counter: { value: any; }; }) => state.counter.value

export default counterSlice.reducer