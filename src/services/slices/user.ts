import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'

interface IUserState {
    name: string
    email: string
    isLoggedOn: boolean
    isPasswordReset: boolean
}

const initialState = {
    name: '',
    email: '',
    isLoggedOn: false,
    isPasswordReset: false,
}

export const userSlice = createSlice<IUserState, SliceCaseReducers<IUserState>, string>({
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
                state.name = ''
                state.email = ''
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