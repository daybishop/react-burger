import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { userSelectors } from '../../services/selectors/user';

export const ProtectedRoute: FC<RouteProps> = ({ ...routeProps }) => {

    const isLoggedOn: boolean = useSelector(userSelectors.isLoggedOn)

    return isLoggedOn
        ? <Route {...routeProps} />
        : <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />

}
