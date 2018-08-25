import * as React from 'react';
import { Form, Row, Col, FormGroup, Input, Label, FormText } from 'reactstrap';
interface IRegisterProps {
    // Empty Props For Now
}

interface IRegisterState {
    name: string;
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
            email: '',
            password: '',
            confirmPassword: '',
            errors: {},
        };

        this.onNameChange = this.onNameChange.bind(this);
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
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };
        console.log(newUser);
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
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                id="email"
                                value={this.state.email}
                                onChange={this.onEmailChange}
                            />
                            <FormText color="muted">
                                Please use a Gravatar associated email if
                                applicable.
                            </FormText>
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

                        <Input
                            type="submit"
                            className="btn btn-info btn-block mt-4"
                        />
                    </Form>
                </Col>
            </Row>
        );
    }
}
export default Register;
