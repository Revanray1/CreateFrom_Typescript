import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: "",
  email: '',
  gender: '',
  education: [],
  workExperience: []
}


export const FormDataSlice = createSlice({
  name: 'FormData',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      return { ...state, ...action.payload }
    },
    removeFormData: () => {
      return initialState
    },
  }
})

export const { setFormData ,removeFormData} = FormDataSlice.actions

export default FormDataSlice.reducer

