import { Redirect, Route } from 'react-router-dom';
import { isAuth } from '../../utils/auth';

export function ProtectedRoute({ children, ...rest }) {

    const auth = isAuth()

    return (
        <Route {...rest} render={prop => (
            auth
                ? (children)
                : <Redirect to={{ pathname: '/login', state: { from: prop.location } }} />
        )}
        />
    );
}