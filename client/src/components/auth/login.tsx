import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        console.log('Successful Registration');
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="large text-primary">Login</h1>
                        <p className="lead">
                            <i className="fas fa-user" />
                            Sign Into your account
                        </p>
                        <form className="form" onSubmit={async (e: React.SyntheticEvent) => onSubmit(e)}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e: React.SyntheticEvent) => onChange(e)}
                                    name="email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e: React.SyntheticEvent) => onChange(e)}
                                    name="password"
                                    minLength={6}
                                    required
                                />
                            </div>

                            <input type="submit" className="btn btn-primary" value="Login" />
                        </form>
                        <p className="my-1">
                            Don't have an account? <Link to={'/register'}>Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
