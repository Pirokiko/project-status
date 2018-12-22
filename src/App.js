import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {Project} from './components/page/Project'
import {Home} from './components/page/Home'
import {Client} from './components/page/Client'
import {BasePage} from './components/page/BasePage'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <BasePage>
                    <Route path="/" exact component={Home}/>
                    <Route path="/client/:id" component={Client}/>
                    <Route path="/project/:id" component={Project}/>
                </BasePage>
            </BrowserRouter>
        );
    }
}

export default App;
