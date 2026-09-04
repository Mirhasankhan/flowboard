import React from 'react';
import UpdateUserDetails from './UpdateUserDetails';
import UpdateProfileImage from './UpdateProfileImage';

const UserProfile = () => {
    return (
        <div className='p-3'>
            <UpdateProfileImage></UpdateProfileImage>
            <UpdateUserDetails></UpdateUserDetails>
        </div>
    );
};

export default UserProfile;