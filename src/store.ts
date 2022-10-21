import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './services/slices/ingredients'
import logger from 'redux-logger'
import constructorReducer, { initialState } from './services/slices/constructor'
import thunk from 'redux-thunk'
import userReducer from './services/slices/user'
import feedReducer, { actions as feedActions } from './services/slices/feed'
import { loadState } from './utils/local-storage'
import { socketMiddleware } from './services/api/wsMiddleware'
import orderReducer, { actions as orderActions } from './services/slices/orders'


const preloadedState = loadState() || { constructor: initialState }

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(thunk)
            .concat(logger)
            .concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all', feedActions))
            .concat(socketMiddleware('wss://norma.nomoreparties.space/orders', orderActions, true)),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    reducer: {
        ingredients: ingredientsReducer,
        constructor: constructorReducer,
        user: userReducer,
        feed: feedReducer,
        orders: orderReducer
    },
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType<typeof store.getState>