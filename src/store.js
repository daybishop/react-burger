import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './services/slices/ingredients'
import logger from 'redux-logger'
import constructorReducer from './services/slices/constructor'
import thunk from 'redux-thunk'
import userReducer from './services/slices/user'
import { loadState } from './utils/local-storage'


const preloadedState = loadState();

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    reducer: {
        ingredients: ingredientsReducer,
        constructor: constructorReducer,
        user: userReducer,
    },
})