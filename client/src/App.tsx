import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Alert from './components/alert/Alert';

// Redux Store
import { Provider } from 'react-redux';
import { store } from './state/store';

import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Alert />
                <main>
                    <Switch>
                        {/* TODO: Convert Below To Map Function */}
                        <Route path="/" exact component={Landing} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />

                        {/* Handles Unfound Routes */}
                        <Route render={() => <h1>Add a 404 Page Here</h1>} />
                    </Switch>
                </main>
            </Router>
        </Provider>
    );
};

export default App;
