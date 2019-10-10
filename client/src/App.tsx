import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/alert/Alert';

// Redux Store
import { Provider } from 'react-redux';
import { store } from './state/store';

import './App.css';

// TODO: Look into React Error Boundary
// To Protect App from Uncaught Errors & Edge Cases

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
                        <Route render={() => <h1>Add a 404 Page Component Here</h1>} />
                    </Switch>
                </main>
            </Router>
        </Provider>
    );
};

export default App;
