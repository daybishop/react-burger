import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { TFeedOrder } from '../../utils/types'

export interface IOrdersState {
    wsConnected: boolean
    error: string | undefined
    orders: Array<TFeedOrder> | []
    total: number | null
    totalToday: number | null
}

export const initialState = {
    wsConnected: false,
    error: undefined,
    orders: [],
    total: 0,
    totalToday: 0
}

export const ordersSlice = createSlice<IOrdersState, SliceCaseReducers<IOrdersState>, string>({
    name: 'orders',
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
        }
    },
})

export const {
    connectionStart,
    connectionSuccess,
    connectionError,
    connectionClosed,
    getMessage
} = ordersSlice.actions

export const actions = ordersSlice.actions

export default ordersSlice.reducer