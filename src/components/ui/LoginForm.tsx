import React from 'react';
import FacebookLogin from 'react-facebook-login';

const LoginForm = (props) => {
    const handleFacebookCallback = (response) => {
        if (response?.status === "unknown") {
            console.error('Sorry!', 'Something went wrong with facebook Login.');
            return;
        }

    }
    return (
        <FacebookLogin
            buttonStyle={{ padding: "6px" }}
            appId="1754703885143367"
            autoLoad={false}
            fields="name,picture"
            callback={handleFacebookCallback} 
            />
    );
};
export default LoginForm;