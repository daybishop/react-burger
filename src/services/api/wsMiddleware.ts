import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';
import { IFeedState } from '../slices/orders';
import { getAccessToken } from './auth';

// import type { AppActions, AppDispatch, RootState } from '../types';

type AppActions = any
type AppDispatch = any
type RootState = any

type TActions = CaseReducerActions<SliceCaseReducers<IFeedState>>

export const socketMiddleware = (wsUrl: string, actions: TActions, useToken?: boolean): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {

            const { dispatch } = store;

            if (action.type === actions.connectionStart.type) {
                const token = getAccessToken()
                const url = useToken ? `${wsUrl}?token=${token}` : `${wsUrl}`
                socket = new WebSocket(url)
            }

            if (socket) {

                socket.onopen = event => {
                    dispatch(actions.connectionSuccess)
                }

                socket.onerror = event => {
                    dispatch(actions.connectionError(event))
                }

                socket.onmessage = event => {
                    const { data } = event
                    dispatch(actions.getMessage(data))
                }

                socket.onclose = event => {
                    dispatch(actions.connectionClosed)
                }
            }

            next(action);
        };
    }) as Middleware;
};