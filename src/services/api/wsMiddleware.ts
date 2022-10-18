import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';
import { TAppDispatch, TRootState } from '../../store';
import { IOrdersState } from '../slices/orders';
import { getAccessToken } from './auth';

type AppAction = ActionCreatorWithPayload<any, string> | ActionCreatorWithoutPayload<string>
type TActions = CaseReducerActions<SliceCaseReducers<IOrdersState>>

export const socketMiddleware = (wsUrl: string, actions: TActions, useToken?: boolean): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AppAction) => {

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