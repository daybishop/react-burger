import reducer, { ingredientsSlice, initialState } from './ingredients'


test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
        initialState
    )
})

test('check startLoading', () => {
    const previousState = initialState

    expect(reducer(previousState, ingredientsSlice.actions.startLoading(''))).toEqual(
        {
            ...initialState,
            isLoading: true,
            error: false
        }
    )
})

test('check loadingSuccess', () => {
    const previousState = initialState
    const payload = ['test data']

    expect(reducer(previousState, ingredientsSlice.actions.loadingSuccess(payload))).toEqual(
        {
            ...initialState,
            isLoading: false,
            items: payload
        }
    )
})

test('check hasError', () => {
    const previousState = initialState

    expect(reducer(previousState, ingredientsSlice.actions.hasError(true))).toEqual(
        {
            ...initialState,
            isLoading: false,
            error: true
        }
    )
})

test('check selectItem', () => {
    const previousState = initialState

    expect(reducer(previousState, ingredientsSlice.actions.selectItem('item'))).toEqual(
        {
            ...initialState,
            selectedItem: 'item'
        }
    )
})

test('check clearSelectedItem', () => {
    const previousState = initialState

    expect(reducer(previousState, ingredientsSlice.actions.clearSelectedItem(''))).toEqual(
        {
            ...initialState,
            selectedItem: null
        }
    )
})

test('check setCurrentTab', () => {
    const previousState = initialState

    expect(reducer(previousState, ingredientsSlice.actions.setCurrentTab('tab1'))).toEqual(
        {
            ...initialState,
            currentTab: 'tab1'
        }
    )
    expect(reducer(previousState, ingredientsSlice.actions.setCurrentTab('tab2'))).toEqual(
        {
            ...initialState,
            currentTab: 'tab2'
        }
    )
})

