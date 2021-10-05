import React from 'react';
import {Button} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
        <Button onClick={() => loginWithRedirect()}>
            Login
        </Button>
        )
    )
}

export default LoginButton;