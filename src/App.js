import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

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
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
