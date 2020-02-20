import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
// This Provider component makes Redux Store become available in all components. 
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

// Redux Store becomes availale here.
const store = ConfigureStore();

class App extends Component {

    render() {
        return (
            // Wrapping the router with the Provider component and passing the store, Redux Store becomes available for all components in this container.
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Main />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
