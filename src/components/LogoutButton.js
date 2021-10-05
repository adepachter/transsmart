import React from 'react';
import {Button} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
        <Button variant="info" onClick={() => logout()}>
            Logout
        </Button>
        )
    )
}

export default LogoutButton;