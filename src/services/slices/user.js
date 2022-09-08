import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    email: null,
    isActive: false,
    isLoading: false,
    isPasswordReset: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loading: (state) => {
            state.isLoading = true
        },
        setUser: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.isActive = true
            state.isLoading = false
        },
        resetUser: (state) => {
            state.name = null
            state.email = null
            state.isActive = false
            state.isLoading = false
        },
        setIsPasswordReset: (state, action) => {
            state.isPasswordReset = action.payload
        }
    },
})

export const { loading, setUser, resetUser, setIsPasswordReset } = userSlice.actions

export default userSlice.reducer