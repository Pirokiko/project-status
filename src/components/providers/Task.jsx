import React from 'react';
import PropTypes from 'prop-types';
import {getTasks} from '../../lib/api'

const {Provider, Consumer} = React.createContext([]);

export class TaskProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
        this.refreshTasks = this.refreshTasks.bind(this);

        this.loaded = false;
        this.load = this.load.bind(this);
    }

    refreshTasks() {
        getTasks()
            .then(tasks => this.setState({tasks}))
            .catch(err => console.error(err));
    }

    load(){
        if(!this.loaded){
            this.loaded = true;
            this.refreshTasks();
        }
    }

    componentDidMount() {
        //setup the api call, subscribe to websocket for changes, etc ......
        setTimeout(this.load, 10000);

        document.addEventListener('task.changed', this.refreshTasks);
    }

    render() {
        return (
            <Provider {...this.props} value={{
                tasks:this.state.tasks,
                load: this.load,
            }}/>
        );
    }
}
TaskProvider.propTypes = {};
TaskProvider.defaultProps = {};

export const TaskConsumer = ({id, sprintIds, children: renderFunc}) => (
    <Consumer>
        {({ tasks }) => {
            if(id){
                return renderFunc(tasks.find(task => task.id === id));
            }
            if (sprintIds) {
                tasks = tasks.filter(task => sprintIds.includes(task.sprintId));
            }
            return renderFunc(tasks);
        }}
    </Consumer>
);
TaskConsumer.propTypes = {
    id: PropTypes.string,
    sprintIds: PropTypes.array,
};
TaskConsumer.defaultProps = {
    id: null,
    sprintIds: null,
};

export const TaskProviderLoader = ({ children: renderFunc }) => (
    <Consumer>
        {({ load }) => renderFunc(load)}
    </Consumer>
);