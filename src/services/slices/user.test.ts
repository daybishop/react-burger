import reducer, { initialState, userSlice } from './user'

test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
        initialState
    )
})

test('should set user, email and isLoggedOn', () => {
    const previousState = initialState
    const payload = { name: 'user', email: 'email', isLoggedOn: true }
    const payload_empty = { name: '', email: '', isLoggedOn: false }

    expect(reducer(previousState, userSlice.actions.setUser(payload))).toEqual(
        {
            ...initialState,
            ...payload
        }
    )
    expect(reducer(previousState, userSlice.actions.setUser(''))).toEqual(
        {
            ...initialState,
            ...payload_empty
        }
    )
})

test('should set isPasswordReset', () => {
    const previousState = initialState
    expect(reducer(previousState, userSlice.actions.setIsPasswordReset(true))).toEqual(
        {
            ...initialState,
            isPasswordReset: true
        }
    )
    expect(reducer(previousState, userSlice.actions.setIsPasswordReset(false))).toEqual(
        {
            ...initialState,
            isPasswordReset: false
        }
    )
})
