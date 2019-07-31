import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';

import Register from './components/auth/register';
import Login from './components/auth/login';

import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <section className="container">
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </section>
            </Fragment>
        </BrowserRouter>
    );
};

export default App;
