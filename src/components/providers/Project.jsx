import React from 'react';
import PropTypes from 'prop-types';
import {getProjects} from '../../lib/api'

const {Provider, Consumer} = React.createContext();

export class ProjectProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };

        this.refreshProjects = this.refreshProjects.bind(this);
    }

    refreshProjects(){
        getProjects()
            .then(projects => this.setState({projects}))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        //setup the api call, subscribe to websocket for changes, etc ......
        this.refreshProjects();

        document.addEventListener('project.changed', this.refreshProjects);
    }

    render() {
        return (
            <Provider {...this.props} value={this.state.projects}/>
        );
    }
}

ProjectProvider.propTypes = {
    clientId: PropTypes.string,
};
ProjectProvider.defaultProps = {
    clientId: null,
};

export const ProjectConsumer = ({id, clientIds, children: renderFunc}) => (
    <Consumer>
        {(projects) => {
            if(id){
                return renderFunc(projects.find(project => project.id === id));
            }
            if (clientIds.length > 0) {
                projects = projects.filter(project => clientIds.includes(project.clientId));
            }
            return renderFunc(projects);
        }}
    </Consumer>
);
ProjectConsumer.propTypes = {
    id: PropTypes.string,
    clientIds: PropTypes.array,
};
ProjectConsumer.defaultProps = {
    id: null,
    clientIds: [],
};

