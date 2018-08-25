import * as React from 'react';
import '../assets/scss/main.scss';

import { Container } from 'reactstrap';

// Component Imports
import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Footer from '../components/layout/Footer';

import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

// Library Imports
import { BrowserRouter as Router, Route } from 'react-router-dom';

class MainView extends React.Component {
    public render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact={true} path="/" component={Landing} />
                    <Container fluid={true}>
                        <Route
                            exact={true}
                            path="/register"
                            component={Register}
                        />
                        <Route exact={true} path="/login" component={Login} />
                    </Container>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default MainView;
