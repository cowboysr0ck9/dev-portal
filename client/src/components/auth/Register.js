import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        const { name, email, password, password2 } = this.state;
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            password2,
        };
        console.log(newUser);
    }

    render() {
        const { name, email, password, password2 } = this.state;

        return (
            <Container>
                <Row>
                    <Col md="8" className="m-auto">
                        <h1 className="display-4 text-center">Register</h1>
                        <p className="lead text-center">
                            Create your new account
                        </p>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={password2}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button
                                type="submit"
                                color="primary"
                                className="btn-block mt-4"
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Register;
