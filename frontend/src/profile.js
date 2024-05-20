import React from 'react';
import { useLocation } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const { user } = location.state || {};

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>User Profile</h2>
                {user ? (
                    <div>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                ) : (
                    <p>No user data available.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
