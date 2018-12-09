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

        document.addEventListener('project.change', this.refreshProjects);
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

export const ProjectConsumer = ({id, clientId, children: renderFunc}) => (
    <Consumer>
        {(projects) => {
            if(id){
                return renderFunc(projects.find(project => project.id === id));
            }
            if (clientId) {
                projects = projects.filter(project => project.clientId === clientId);
            }
            return renderFunc(projects);
        }}
    </Consumer>
);
ProjectConsumer.propTypes = {
    id: PropTypes.string,
    clientId: PropTypes.string,
};
ProjectConsumer.defaultProps = {
    id: null,
    clientId: null,
};

