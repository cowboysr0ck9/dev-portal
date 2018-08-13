import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './assets/scss/main.css';
import registerServiceWorker from './registerServiceWorker';
import MainView from './views/MainView';

ReactDOM.render(
    <BrowserRouter>
        <MainView />
    </BrowserRouter>,
    document.getElementById('eads-graphic') as HTMLElement
);
registerServiceWorker();
