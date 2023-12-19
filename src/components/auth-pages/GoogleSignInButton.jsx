import React, { useContext } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import apiUrl from '../../apiUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const GoogleSignInButton = ({ role }) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const { mainRequest } = useContext(AppContext);
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));

    const handleSuccess = async credentialResponse => {
        try {
            // Check if the response structure matches your library's documentation
            if (credentialResponse.credential && credentialResponse.clientId) {
                const { credential, clientId } = credentialResponse;
                const credentialData = JSON.parse(atob(credential.split('.')[1]));

                // Create a data object with the required fields
                const userData = {
                    first_name: credentialData.given_name,
                    last_name: credentialData.family_name,
                    email: credentialData.email,
                    provider_id: credentialData.sub, // Assuming sub is the provider ID
                };

                if (role === "user") {
                    const response = await axios.post(`${apiUrl}/user/socialite`, userData);
                    toast.success(i18n.language === "en" ? "You are logged in successfully" : "تم تسجيل الدخول بنجاح");
                    const user = response.data.user;
                    user.token = response.data.access_token; // Add the token to the user object
                    localStorage.clear();
                    localStorage.setItem("userToken", JSON.stringify(user.token)); // Save user information in local storage
                    localStorage.setItem("userLogged", true);
                    localStorage.setItem("providerId", response.data.user.provider_id);
                    const userDataReq = await mainRequest(`${apiUrl}/auth/user-profile?token=${user.token}`);
                    const { data } = userDataReq
                    navigate("/profile")
                    if (!data.phone) {
                        localStorage.setItem("complete", false);
                        localStorage.setItem("role", "user");
                        location.href = "/"
                    }
                }
                if (role === "seller") {
                    const response = await axios.post(`${apiUrl}/vendor/socialite`, userData);
                    toast.success(i18n.language === "en" ? "You are logged in successfully" : "تم تسجيل الدخول بنجاح");
                    const user = response.data;
                    user.token = response.data.access_token;
                    localStorage.clear();
                    localStorage.setItem("sellerToken", JSON.stringify(response.data.access_token)); // Save seller information in local storage
                    localStorage.setItem("sellerLogged", true);
                    localStorage.setItem("providerId", credentialData.sub);
                    const userDataReq = await mainRequest(`${apiUrl}/vendor/auth/user-profile?token=${user.token}`);
                    const { data } = userDataReq
                    navigate("/dashboard")
                    if (!data.phone) {
                        localStorage.setItem("complete", false);
                        localStorage.setItem("role", "seller");
                        location.href = "/"
                    }
                }

            } else {
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const handleFailure = () => {
        console.log('Login Failed');
        // Handle login failure here
    };


    return (
        <>
            <GoogleOAuthProvider clientId="289535605481-6vot6d8uosg3aakd7utugpe3vemh5gv1.apps.googleusercontent.com">
                {/* Your other application content */}
                <GoogleLogin
                    className="bg-red-500"
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                    auto_select
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleSignInButton;
