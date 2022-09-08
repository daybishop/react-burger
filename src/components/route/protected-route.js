import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { userSelectors } from '../../services/selectors/user';

export function ProtectedRoute({ children, ...rest }) {

    const isLoading = useSelector(userSelectors.isLoading)
    const isActive = useSelector(userSelectors.isActive)

    console.log('isLoading', isLoading)

    if (isLoading) return null

    return (
        <Route {...rest} render={prop => (
            isActive
                ? (children)
                : <Redirect to={{ pathname: '/login', state: { from: prop.location } }} />
        )}
        />
    );
}