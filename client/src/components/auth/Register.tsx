import * as React from 'react';
import {
    Form,
    Row,
    Col,
    FormGroup,
    Input,
    Label,
    Button,
    FormFeedback,
} from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';

interface IRegisterProps {
    // Empty Props For Now
}

interface IRegisterState {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    errors: {
        username?: string;
        name?: string;
        email?: string;
        password?: string;
        password2?: string;
    };
}

class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {},
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    // --------------------
    // Capture Form Values
    // --------------------
    onNameChange(e: any) {
        this.setState({ name: e.target.value });
    }

    onUserNameChange(e: any) {
        this.setState({ username: e.target.value });
    }

    onEmailChange(e: any) {
        this.setState({ email: e.target.value });
    }

    onPasswordChange(e: any) {
        this.setState({ password: e.target.value });
    }

    onConfirmPasswordChange(e: any) {
        this.setState({ confirmPassword: e.target.value });
    }

    // ----------------------
    // Submits Register Form
    // ----------------------
    onSubmit(event: React.FormEvent) {
        // This e.preventDefault() is needed because we
        // do not want the default form action occuring
        event.preventDefault();

        const newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.confirmPassword,
        };

        // -------------------------------------
        // POST request to 'api/users/register'
        // -------------------------------------
        axios
            .post('api/users/register', newUser)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                this.setState({ errors: err.response.data });
            });
    }

    render() {
        // Captures this.state errors for Bootstrap 4 Form Validation
        const errors = this.state.errors;
        return (
            <Row>
                <Col className="col-sm-6 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">
                        Create your DevConnector account
                    </p>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                className={classnames('form-control-lg', {
                                    'is-invalid': errors.name,
                                })}
                                type="text"
                                placeholder="Name"
                                name="name"
                                id="name"
                                value={this.state.name}
                                onChange={this.onNameChange}
                            />
                            {errors.name && (
                                <FormFeedback>{errors.name}</FormFeedback>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                className={classnames('form-control-lg', {
                                    'is-invalid': errors.username,
                                })}
                                type="text"
                                placeholder="Username"
                                name="username"
                                id="username"
                                value={this.state.username}
                                onChange={this.onUserNameChange}
                            />
                            {errors.username && (
                                <FormFeedback>{errors.username}</FormFeedback>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                className={classnames('form-control-lg', {
                                    'is-invalid': errors.email,
                                })}
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                id="email"
                                value={this.state.email}
                                onChange={this.onEmailChange}
                            />
                            {errors.email && (
                                <FormFeedback>{errors.email}</FormFeedback>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                className={classnames('form-control-lg', {
                                    'is-invalid': errors.password,
                                })}
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                            />
                            {errors.password && (
                                <FormFeedback>{errors.password}</FormFeedback>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label for="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                className={classnames('form-control-lg', {
                                    'is-invalid': errors.password2,
                                })}
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onConfirmPasswordChange}
                            />
                            {errors.password2 && (
                                <FormFeedback>{errors.password2}</FormFeedback>
                            )}
                        </FormGroup>

                        <Button type="submit" className="btn btn-info">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}
export default Register;
