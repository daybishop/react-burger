import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { userSelectors } from '../../services/selectors/user';
import { useAppSelector } from '../../utils/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ ...routeProps }) => {

    const isLoggedOn: boolean = useAppSelector(userSelectors.isLoggedOn)

    return isLoggedOn
        ? <Route {...routeProps} />
        : <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />

}
