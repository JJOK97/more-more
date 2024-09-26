import React from 'react';

const ProfileItem = ({ label, value }) => {
    return (
        <div className="profile-item">
            <div className="profile-label">{label}</div>
            <div className="profile-value">{value}</div>
        </div>
    );
};

export default ProfileItem;
