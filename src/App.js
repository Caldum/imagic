import './App.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Index from './components/Index';
import Success from './components/Success';
import ImageDetails from './components/ImageDetails';
import Error404 from './components/Error404';

function App() {
    return (
        <React.Fragment>
            <Route path="/" component={Navbar} />
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/success/:identifier" component={Success} />
                <Route exact path="/:identifier" component={ImageDetails} />
                <Route path="*" component={Error404} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
