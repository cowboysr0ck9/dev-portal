import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords Do Not Match');
        } else {
            console.log(formData);
        }
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user" />
                Create Your Account
            </p>
            <form
                className="form"
                onSubmit={async (e: React.SyntheticEvent) => onSubmit(e)}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={async (e: React.SyntheticEvent) =>
                            onChange(e)
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e: React.SyntheticEvent) => onChange(e)}
                        name="email"
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: React.SyntheticEvent) => onChange(e)}
                        name="password"
                        minLength={6}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e: React.SyntheticEvent) => onChange(e)}
                        name="password2"
                        minLength={6}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    );
};

export default Register;
