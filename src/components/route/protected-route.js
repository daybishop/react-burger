import { Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { userSelectors } from '../../services/selectors/user';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/auth';

export function ProtectedRoute({ children, ...rest }) {

    const userIsActive = useSelector(userSelectors.isActive)
    const userIsLoaded = useSelector(userSelectors.isLoaded)

    const dispatch = useDispatch()

    const init = async () => {
        dispatch(getUser())
    };

    useEffect(() => {
        init();
    }, []);

    if (!userIsLoaded) {
        return null;
    }

    console.log('isActive', userIsActive)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                userIsActive ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location.pathname }
                        }}
                    />
                )
            }
        />
    );
}