import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {Sprint} from './components/page/Sprint'
import {Project} from './components/page/Project'
import {Home} from './components/page/Home'
import {Client} from './components/page/Client'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Route path="/" exact component={Home}/>
                    <Route path="/client/:id" component={Client}/>
                    <Route path="/project/:id" component={Project}/>
                    <Route path="/sprint/:id" component={Sprint}/>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
