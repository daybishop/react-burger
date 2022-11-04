import reducer, { initialState, ordersSlice } from './orders'


test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
        initialState
    )
})

test('should set wsConnected to false', () => {
    const previousState = initialState

    expect(reducer(previousState, ordersSlice.actions.connectionStart(''))).toEqual(
        {
            ...initialState,
            wsConnected: false
        }
    )
})

test('should set wsConnected to true and error to undefinned', () => {
    const previousState = initialState

    expect(reducer(previousState, ordersSlice.actions.connectionSuccess(''))).toEqual(
        {
            ...initialState,
            wsConnected: true,
            error: undefined
        }
    )
})

test('should set wsConnected to false and error from payload', () => {
    const previousState = initialState
    const payload = 'some error'

    expect(reducer(previousState, ordersSlice.actions.connectionError(payload))).toEqual(
        {
            ...initialState,
            wsConnected: false,
            error: payload
        }
    )
})

test('should set wsConnected to false and error to undefinned', () => {
    const previousState = initialState

    expect(reducer(previousState, ordersSlice.actions.connectionClosed(''))).toEqual(
        {
            ...initialState,
            wsConnected: false,
            error: undefined
        }
    )
})

test('check getMessage success', () => {
    const previousState = initialState
    const payload = {
        orders: ['orders'],
        total: 100,
        totalToday: 1000
    }

    expect(reducer(previousState, ordersSlice.actions.getMessage(JSON.stringify({ ...payload, success: true })))).toEqual(
        {
            ...initialState,
            ...payload
        }
    )
})

test('check getMessage error', () => {
    const previousState = initialState
    const payload = {
        error: 'message',
        orders: [],
        total: 0,
        totalToday: 0
    }

    expect(reducer(previousState, ordersSlice.actions.getMessage(JSON.stringify({ success: false, message: 'message' })))).toEqual(
        {
            ...initialState,
            ...payload
        }
    )
})
