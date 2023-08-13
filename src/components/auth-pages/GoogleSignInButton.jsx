import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = () => {

    const handleSuccess = credentialResponse => {
        console.log('Login Successful:', credentialResponse);

        // Check if the response structure matches your library's documentation
        if (credentialResponse.credential && credentialResponse.clientId) {
            const { credential, clientId } = credentialResponse;

            // You can parse the credential if needed
            const credentialData = JSON.parse(atob(credential.split('.')[1]));

            console.log('User Profile Data:', credentialData);

            // Handle further actions, such as updating the UI or sending data to your server
        } else {
            console.log('Login data structure is not as expected:', credentialResponse);
        }
    };

    const handleFailure = () => {
        console.log('Login Failed');
        // Handle login failure here
    };


    return (
        <GoogleOAuthProvider clientId="289535605481-6vot6d8uosg3aakd7utugpe3vemh5gv1.apps.googleusercontent.com">
            {/* Your other application content */}
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                auto_select  // Enable automatic sign-in
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleSignInButton;
