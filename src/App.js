import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {Sprint} from './components/page/Sprint'
import {Project} from './components/page/Project'
import {Home} from './components/page/Home'
import {Client} from './components/page/Client'
import {BasePage} from './components/page/BasePage'
import {Breadcrumb} from './components/molecule/Breadcrumb'
import {breadcrumbKeyMap} from './lib/breadcrumbKeymap'

const App = () => (
    <BrowserRouter>
        <React.Fragment>
            <Breadcrumb keyMap={breadcrumbKeyMap}/>
            <BasePage>
                <Route path="/" exact component={Home}/>
                <Route path="/client/:id" component={Client}/>
                <Route path="/project/:id" component={Project}/>
                <Route path="/sprint/:id" component={Sprint}/>
            </BasePage>
        </React.Fragment>
    </BrowserRouter>
);

export default App;
