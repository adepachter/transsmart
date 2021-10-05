import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div>
                <img className="profilepicture" src={user.picture} alt={user.name} />
                
            </div>
        )
    )
}

export default Profile;