import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    email: null,
    isActive: false,
    isLoaded: false,
    isPasswordReset: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.isActive = true
            state.isLoaded = true
        },
        resetUser: (state) => {
            state.name = null
            state.email = null
            state.isActive = false
            state.isLoaded = true
        },
        setIsPasswordReset: (state, action) => {
            state.isPasswordReset = action.payload
        }
    },
})

export const { setUser, resetUser, setIsPasswordReset } = userSlice.actions

export default userSlice.reducer