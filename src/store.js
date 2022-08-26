import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './services/slices/ingredients'
import logger from 'redux-logger'
import constructorReducer from './services/slices/constructor'
import thunk from 'redux-thunk'


const preloadedState = {
    constructor: {
        items: []
    }
}

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    reducer: {
        ingredients: ingredientsReducer,
        constructor: constructorReducer,
    },
})