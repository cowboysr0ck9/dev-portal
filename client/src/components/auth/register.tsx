import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../state/actions';

import { Link } from 'react-router-dom';

const Register = (props: any) => {
    const { setAlert } = props;

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, username, email, password, password2 } = formData;

    const onChange = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            setAlert('You have successfully Registered', 'success');
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12" />
                    <h1 className="large text-primary">Sign Up</h1>
                    <p className="lead">
                        <i className="fas fa-user" />
                        Create Your Account
                    </p>
                    <form className="form" onSubmit={async (e: React.SyntheticEvent) => onSubmit(e)}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={async (e: React.SyntheticEvent) => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={async (e: React.SyntheticEvent) => onChange(e)}
                                required
                            />
                        </div>
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
                            <small className="form-text">
                                This site uses Gravatar so if you want a profile image, use a Gravatar email
                            </small>
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
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={(e: React.SyntheticEvent) => onChange(e)}
                                name="password2"
                                minLength={6}
                                required
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <p className="my-1">
                        Already have an account? <Link to={'/login'}>Sign In</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default connect(
    null,
    { setAlert }
)(Register);
