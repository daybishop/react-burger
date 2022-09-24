import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { userSelectors } from '../../services/selectors/user';

export function AnonymousRoute({ children, ...rest }) {

    const isLoggedOn = useSelector(userSelectors.isLoggedOn)
    const history = useHistory()

    return (
        <Route {...rest} render={prop => (
            isLoggedOn
                ? <Redirect to={{ pathname: history.location.state?.from.pathname || '/' }} />
                : (children)
        )}
        />
    );
}