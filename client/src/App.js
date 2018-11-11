import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import { ROUTES } from './routes-config';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="grid-container">
                    <Navbar />
                    <Route exact path={ROUTES.ROOT} component={Landing} />
                    <div>
                        <Route
                            exact
                            path={ROUTES.REGISTER}
                            component={Register}
                        />
                        <Route exact path={ROUTES.LOGIN} component={Login} />
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
