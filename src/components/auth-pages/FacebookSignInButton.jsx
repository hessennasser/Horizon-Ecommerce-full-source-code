import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';

const FacebookSignInButton = () => {
    const handleFacebookResponse = (response) => {
        console.log('Facebook Login Response:', response);
        // Handle the response data (e.g., make API calls, set user state, etc.)

        if (response.accessToken) {
            // Login Successfully
        } else {
            // Login Failed
            
        }

    };

    return (
        <FacebookLogin
            appId="239970005602368"
            cookie={true}
            onSuccess={handleFacebookResponse}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}
            render={({ onClick, logout }) => (
                <button
                    onClick={onClick}
                    style={{
                        backgroundColor: '#4267b2',
                        color: '#fff',
                        fontSize: '16px',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Login with Facebook
                </button>
            )}
        />
    );
};

export default FacebookSignInButton;