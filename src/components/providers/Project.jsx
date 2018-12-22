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

        this.loaded = false;
        this.load = this.load.bind(this);

        this.refreshProjects = this.refreshProjects.bind(this);
    }

    refreshProjects(){
        getProjects()
            .then(projects => this.setState({projects}))
            .catch(err => console.error(err));
    }

    load(){
        if(!this.loaded){
            this.loaded = true;
            this.refreshProjects();
        }
    }

    componentDidMount() {
        //setup the api call, subscribe to websocket for changes, etc ......
        setTimeout(this.load, 10000);

        document.addEventListener('project.changed', this.refreshProjects);
    }

    render() {
        return (
            <Provider {...this.props} value={{
                projects: this.state.projects,
                load: this.load,
            }}/>
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
        {({projects}) => {
            if(id){
                return renderFunc(projects.find(project => project.id === id));
            }
            if (clientIds) {
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
    clientIds: null,
};

export const ProjectProviderLoader = ({ children: renderFunc }) => (
    <Consumer>
        {({ load }) => renderFunc(load)}
    </Consumer>
);