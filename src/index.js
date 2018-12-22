import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ProjectProvider} from './components/providers/Project'
import {SprintProvider} from './components/providers/Sprint'
import {ClientProvider} from './components/providers/Client'
import {TaskProvider} from './components/providers/Task'

ReactDOM.render(
    <ClientProvider>
        <ProjectProvider>
            <SprintProvider>
                <TaskProvider>
                    <App />
                </TaskProvider>
            </SprintProvider>
        </ProjectProvider>
    </ClientProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
