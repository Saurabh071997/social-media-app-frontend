import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
    name:"toast",
    initialState:{
        toastActive: false,
        toastMessage: null
    },
    reducers:{
        toggleToast: (state,action ) =>{
            state.toastActive = action.payload.toggle
            state.toastMessage = action.payload.message
        }
    }
})

export const {toggleToast} = toastSlice.actions

export default toastSlice.reducer