import React from 'react';
import PropTypes from 'prop-types';
import {getSprints} from '../../lib/api'

const {Provider, Consumer} = React.createContext();

export class SprintProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sprints: [],
        };
        this.loaded = false;
        this.refreshSprints = this.refreshSprints.bind(this);
        this.load = this.load.bind(this);
    }

    refreshSprints() {
        getSprints()
            .then(sprints => this.setState({sprints}))
            .catch(err => console.error(err));
    }

    load(){
        if(!this.loaded){
            this.loaded = true;
            this.refreshSprints();
        }
    }

    componentDidMount() {
        //setup the api call, subscribe to websocket for changes, etc ......
        setTimeout(this.load, 10000);

        document.addEventListener('sprint.changed', this.refreshSprints);
    }

    render() {
        return (
            <Provider {...this.props} value={{
                sprints: this.state.sprints,
                load: this.load,
            }}/>
        );
    }
}
SprintProvider.propTypes = {};
SprintProvider.defaultProps = {};

export const SprintConsumer = ({id, projectIds, children: renderFunc}) => (
    <Consumer>
        {({sprints}) => {
            if(id){
                return renderFunc(sprints.find(sprint => sprint.id === id));
            }
            if (projectIds) {
                sprints = sprints.filter(sprint => projectIds.includes(sprint.projectId));
            }
            return renderFunc(sprints);
        }}
    </Consumer>
);
SprintConsumer.propTypes = {
    id: PropTypes.string,
    projectIds: PropTypes.array,
};
SprintConsumer.defaultProps = {
    id: null,
    projectIds: null,
};


export const SprintProviderLoader = ({ children: renderFunc }) => (
    <Consumer>
        {({ load }) => renderFunc(load)}
    </Consumer>
);