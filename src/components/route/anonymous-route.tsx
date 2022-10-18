import { Redirect, Route, useHistory } from 'react-router-dom';
import { userSelectors } from '../../services/selectors/user';
import { useAppSelector } from '../../utils/hooks';

interface IState {
    from: {
        pathname: string
    }
}

export function AnonymousRoute({ ...routeProps }) {

    const isLoggedOn = useAppSelector(userSelectors.isLoggedOn)
    const history = useHistory<IState>()

    return isLoggedOn
        ? <Redirect to={{ pathname: history.location.state?.from.pathname || '/' }} />
        : <Route {...routeProps} />

}