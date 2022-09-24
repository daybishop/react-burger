import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    email: null,
    isLoggedOn: false,
    isPasswordReset: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload) {
                state.name = action.payload.name
                state.email = action.payload.email
                state.isLoggedOn = true
            }
            else {
                state.name = null
                state.email = null
                state.isLoggedOn = false
            }
        },
        setIsPasswordReset: (state, action) => {
            state.isPasswordReset = action.payload
        },
    },
})

export const { setUser, setIsPasswordReset } = userSlice.actions

export default userSlice.reducer