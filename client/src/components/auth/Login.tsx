import * as React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface ILoginProps {
    email: string;
    password: string;
    errors: Object;
}

interface ILoginState {
    email: string;
    password: string;
    errors: Object;
}

class Login extends React.Component<ILoginState, ILoginProps> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onEmailChange(e: any) {
        this.setState({ email: e.target.value });
    }

    onPasswordChange(e: any) {
        this.setState({ password: e.target.value });
    }

    // -------------------
    // Submits Login Form
    // -------------------
    onSubmit(event: React.FormEvent) {
        // This e.preventDefault() is needed because we
        // do not want the default form action occuring
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log(user);
    }

    render() {
        return (
            <Row>
                <Col className="col-sm-6 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">
                        Sign in to your DevConnector account
                    </p>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={this.state.email}
                                onChange={this.onEmailChange}
                                id="email"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                                id="password"
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
export default Login;
