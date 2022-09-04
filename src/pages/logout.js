import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../services/actions/auth';

export function LogoutPage() {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(logoutUser())
        history.replace({ pathname: '/' });
    })

    return null

} 