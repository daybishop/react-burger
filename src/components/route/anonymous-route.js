import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { userSelectors } from '../../services/selectors/user';

export function AnonymousRoute({ children, ...rest }) {

    const isLoggedOn = useSelector(userSelectors.isLoggedOn)

    return (
        <Route {...rest} render={prop => (
            isLoggedOn
                ? <Redirect to={{ pathname: '/' }} />
                : (children)
        )}
        />
    );
}