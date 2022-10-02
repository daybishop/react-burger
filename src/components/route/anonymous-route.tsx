import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { userSelectors } from '../../services/selectors/user';

interface IState {
    from: {
        pathname: string
    }
}

export function AnonymousRoute({ ...routeProps }) {

    const isLoggedOn = useSelector(userSelectors.isLoggedOn)
    const history = useHistory<IState>()

    return isLoggedOn
        ? <Redirect to={{ pathname: history.location.state?.from.pathname || '/' }} />
        : <Route {...routeProps} />

}