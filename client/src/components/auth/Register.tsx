import * as React from 'react';
import { Form, Row, Col, FormGroup, Input, Label, Button } from 'reactstrap';
import axios from 'axios';

interface IRegisterProps {
    // Empty Props For Now
}

interface IRegisterState {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    errors: Object;
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

        // Makes a POST Request to Register New User
        axios
            .post('api/users/register', newUser)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.res.data);
            });
    }

    render() {
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
                                type="text"
                                placeholder="Name"
                                name="name"
                                id="name"
                                value={this.state.name}
                                onChange={this.onNameChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                placeholder="Username"
                                name="username"
                                id="username"
                                value={this.state.username}
                                onChange={this.onUserNameChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                id="email"
                                value={this.state.email}
                                onChange={this.onEmailChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onConfirmPasswordChange}
                            />
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
