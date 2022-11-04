import reducer, { constructorSlice, initialState } from './constructor'

const bun = {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}
const item1 = {
    "_id": "60666c42cc7b410027a1a9b5",
    "name": "Говяжий метеорит (отбивная)",
    "type": "main",
    "proteins": 800,
    "fat": 800,
    "carbohydrates": 300,
    "calories": 2674,
    "price": 3000,
    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v": 0
}

const item2 = {
    "_id": "60666c42cc7b410027a1a9b6",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
}

test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
        initialState
    )
})

test('check addItem and deleteItem', () => {
    const previousState = initialState

    let state = reducer(previousState, constructorSlice.actions.addItem(item1))
    state = reducer(state, constructorSlice.actions.addItem(item2))

    expect(state.items.length).toEqual(2)

    state = reducer(state, constructorSlice.actions.deleteItem(state.items[0].uuid))
    state = reducer(state, constructorSlice.actions.deleteItem(state.items[0].uuid))

    expect(state.items.length).toEqual(0)
})

test('check addBun and deleteBun', () => {
    const previousState = initialState

    expect(reducer(previousState, constructorSlice.actions.addBun(bun))).toEqual(
        {
            ...initialState,
            bun: bun,
            totalPrice: 2510
        }
    )
    expect(reducer(previousState, constructorSlice.actions.deleteBun(''))).toEqual(
        {
            ...initialState,
            bun: null
        }
    )
})

test('check clearOrderData', () => {
    const previousState = initialState
    reducer(previousState, constructorSlice.actions.addBun(bun))

    expect(reducer(previousState, constructorSlice.actions.clearOrderData(''))).toEqual(
        {
            ...initialState,
            bun: null,
            items: [],
            totalPrice: 0,
            orderNumber: null
        }
    )
})

test('check setOrderNumber', () => {
    const previousState = initialState
    reducer(previousState, constructorSlice.actions.addBun(bun))

    expect(reducer(previousState, constructorSlice.actions.setOrderNumber(42))).toEqual(
        {
            ...initialState,
            orderNumber: 42
        }
    )
})

test('check moveItem', () => {
    const previousState = initialState
    let state = reducer(previousState, constructorSlice.actions.addItem(item1))
    state = reducer(state, constructorSlice.actions.addItem(item2))

    expect(reducer(state, constructorSlice.actions.moveItem({ dragIndex: 0, hoverIndex: 1 }))).toEqual(
        {
            ...initialState,
            items: [
                { ...state.items[1] },
                { ...state.items[0] },
            ],
            totalPrice: 3424
        }
    )
})

test('check backup and restore items', () => {
    const previousState = initialState
    const added_state = reducer(previousState, constructorSlice.actions.addItem(item1))
    const backup_state = reducer(added_state, constructorSlice.actions.backup(''))
    expect(backup_state).toEqual(
        {
            ...initialState,
            backupItems: [...added_state.items],
            items: [...added_state.items],
            totalPrice: 3000
        }
    )
    const clear_backup_state = reducer(backup_state, constructorSlice.actions.deleteItem(item1))
    expect(reducer(clear_backup_state, constructorSlice.actions.restore(''))).toEqual(
        {
            ...initialState,
            backupItems: [...clear_backup_state.items],
            items: [...clear_backup_state.items],
            totalPrice: 3000
        }
    )

})

test('check showOrder', () => {
    const previousState = initialState

    expect(reducer(previousState, constructorSlice.actions.showOrder(''))).toEqual(
        {
            ...initialState,
            showOrderModal: true
        }
    )
})

test('check hideOrder', () => {
    const previousState = initialState
    reducer(previousState, constructorSlice.actions.addBun(bun))

    expect(reducer(previousState, constructorSlice.actions.hideOrder(''))).toEqual(
        {
            ...initialState,
            showOrderModal: false
        }
    )
})

test('check setOrderRequested', () => {
    const previousState = initialState
    reducer(previousState, constructorSlice.actions.addBun(bun))

    expect(reducer(previousState, constructorSlice.actions.setOrderRequested(true))).toEqual(
        {
            ...initialState,
            isOrderRequested: true
        }
    )
    expect(reducer(previousState, constructorSlice.actions.setOrderRequested(false))).toEqual(
        {
            ...initialState,
            isOrderRequested: false
        }
    )
})    
