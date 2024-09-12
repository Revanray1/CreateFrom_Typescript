import { configureStore } from '@reduxjs/toolkit'
import formDataReducer from './slice'

 const store = configureStore({
  reducer: {
    formData: formDataReducer
  }
})

export type RootState = ReturnType<typeof store["getState"]> 


export default store