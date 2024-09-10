import React from 'react';
import { useStore } from '@/store/userStore';

const Profile = () => {
    const username = useStore((state) => state.username);

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            <p>Username: {username}</p>
        </div>
    );
};

export default Profile;
