import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { TFeedOrder } from '../../utils/types'

interface IOrdersState {
    wsConnected: boolean
    error: string | undefined
    orders: TFeedOrder[] | []
    total: number
    totalToday: number
}

export const initialState = {
    wsConnected: false,
    error: undefined,
    orders: [],
    total: 0,
    totalToday: 0
}

export const feedSlice = createSlice<IOrdersState, SliceCaseReducers<IOrdersState>, string>({
    name: 'feed',
    initialState,
    reducers: {
        connectionStart: state => {
            state.wsConnected = false
        },
        connectionSuccess: state => {
            state.wsConnected = true
            state.error = undefined
        },
        connectionError: (state, action) => {
            state.wsConnected = false
            state.error = action.payload
        },
        connectionClosed: state => {
            state.wsConnected = false
            state.error = undefined
        },
        getMessage: (state, action) => {
            const payload = JSON.parse(action.payload)
            if (payload.success) {
                state.orders = payload.orders
                state.total = payload.total
                state.totalToday = payload.totalToday
            } else {
                state.error = payload.message
                state.orders = []
                state.total = 0
                state.totalToday = 0
            }
        },
        connectionClose: state => { },
    },
})

export const {
    connectionStart,
    connectionSuccess,
    connectionError,
    connectionClosed,
    getMessage,
    connectionClose
} = feedSlice.actions

export const actions = feedSlice.actions

export default feedSlice.reducer