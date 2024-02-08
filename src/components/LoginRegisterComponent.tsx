// replaces the LoginComponent and RegisterComponent
//with a single component that can handle both login and registration.

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

interface LoginRegisterProps {
    isAdmin: boolean;
    isLogin: boolean;
}

const LoginRegisterComponent: React.FC<LoginRegisterProps> = ({ isAdmin, isLogin }) => {
    const navigate = useNavigate();

    const [registerInfo, setRegisterInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(isLogin ? loginInfo: registerInfo); // TODO: database logic here

        if (isLogin) {
            setLoginInfo({ username: '', password: '' });
            if (isAdmin) {
                navigate('/adminHome');
            } else {
                navigate('/userHome');
            }
        }
        else {
            if (registerInfo.password !== registerInfo.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            if (isAdmin) {
                navigate('/adminLogin');
            } else {
                navigate('/userLogin');
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isLogin) {
            setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
        } else {
            setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value });
        }
    }

    return (
        <Container>
            <div className="d-flex justify-content-evenly vh-100">
                <div className="d-flex flex-column justify-content-center">
                    <h1>Image</h1>
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <h1 className="text-center">
                        {
                            isLogin ?
                                `${isAdmin ? 'Admin' : 'Volunteer'} Login` :
                                `${isAdmin ? 'Admin' : 'Volunteer'} Sign Up`
                        }
                    </h1>
                    <h3 className="text-center">
                        {isLogin ? 'Welcome Back!' : 'Nice to meet you!'}
                    </h3>
                    <div>
                        <form onSubmit={handleSubmit} className="d-flex flex-column">
                            {isLogin ? null : (
                                <>
                                    <label>
                                        First Name:
                                        <input type="text" name="firstName" value={registerInfo.firstName} onChange={handleChange} />
                                    </label>
                                    <label>
                                        Last Name:
                                        <input type="text" name="lastName" value={registerInfo.lastName} onChange={handleChange} />
                                    </label>
                                    <label>
                                        Phone Number:
                                        <input type="text" name="phoneNumber" value={registerInfo.phoneNumber} onChange={handleChange} />
                                    </label>
                                </>
                            )}
                            <label>
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={isLogin ? loginInfo.username : registerInfo.username}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={isLogin ? loginInfo.password : registerInfo.password}
                                    onChange={handleChange}
                                />
                            </label>
                            {isLogin ? null : (
                                <label>
                                    Confirm Password:
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={registerInfo.confirmPassword}
                                        onChange={handleChange} />
                                </label>
                            )}
                            <label>
                                <input
                                    type="checkbox"
                                    value={showPassword.toString()}
                                    onChange={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                />
                            </label>
                            <Button className="primary" type="submit">{isLogin ? 'Login' : 'Register'}</Button>
                        </form>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            isLogin ?
                                <p>
                                    {isAdmin ? null : 'Don\'t have an account?'}
                                    {isAdmin ? null : <a href='/userRegister'>Register now</a>}
                                </p>
                                :
                                <p>
                                    Already have an account?
                                    <a href={isAdmin ? '/adminLogin' : '/userLogin'}>
                                        Login now
                                    </a>
                                </p>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );

}

export default LoginRegisterComponent;