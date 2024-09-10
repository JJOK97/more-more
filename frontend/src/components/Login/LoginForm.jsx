import React, { useState } from 'react';

import InputField from '@/components/Login/InputField';
import LoginButton from '@/components/Login/LoginButton';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const setUsername = useStore((state) => state.setUsername);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(username);
        console.log('Logging in with', { username, password });
        navigate('/profile');
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsernameInput(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoginButton />
            </form>
        </div>
    );
};

export default LoginForm;
