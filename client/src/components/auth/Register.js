import React, { Component } from 'react';
import ReactPasswordStrength from 'react-password-strength';
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
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
                        <Form>
                            <FormGroup>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    size="lg"
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
                                    size="lg"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ReactPasswordStrength
                                   
                                    style={{ display: 'block' }}
                                    minLength={8}
                                    minScore={3}
                                    scoreWords={[
                                        'weak',
                                        'okay',
                                        'good',
                                        'strong',
                                        'stronger',
                                    ]}
                                    changeCallback={(e) => console.log(e)}
                                    inputProps={{
                                        name: 'password',
                                        autoComplete: 'off',
                                        className: 'form-control-lg',
                                        placeholder: 'Password'
                                    }}
                                >

                                </ReactPasswordStrength>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    size="lg"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={password2}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button
                                size="lg"
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
