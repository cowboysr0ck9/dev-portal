import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import {ROUTES} from '../../routes-config';


class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <Container>
                        <Row>
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">
                                    Developer Connector
                                </h1>
                                <p>
                                    {' '}
                                    Create a developer profile/portfolio, share
                                    posts and get help from other developers
                                </p>
                                <hr />
                                <Link
                                    to={ROUTES.REGISTER}
                                    className="btn btn-lg btn-info mr-2"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to={ROUTES.LOGIN}
                                    className="btn btn-lg btn-light"
                                >
                                    Login
                                </Link>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
export default Landing;
