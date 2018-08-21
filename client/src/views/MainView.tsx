import * as React from 'react';
import '../assets/scss/main.scss';

import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Footer from '../components/layout/Footer';

class MainView extends React.Component {
    public render() {
        return (
            <div className="App">
                <Navbar />
                <Landing />
                <Footer />
            </div>
        );
    }
}

export default MainView;
