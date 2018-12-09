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
        this.refreshSprints = this.refreshSprints.bind(this);
    }

    refreshSprints() {
        getSprints()
            .then(sprints => this.setState({sprints}))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        //setup the api call, subscribe to websocket for changes, etc ......
        this.refreshSprints();

        document.addEventListener('sprint.changed', this.refreshSprints);
    }

    render() {
        return (
            <Provider {...this.props} value={this.state.sprints}/>
        );
    }
}
SprintProvider.propTypes = {};
SprintProvider.defaultProps = {};

export const SprintConsumer = ({id, projectIds, children: renderFunc}) => (
    <Consumer>
        {(sprints) => {
            if(id){
                return renderFunc(sprints.find(sprint => sprint.id === id));
            }
            if (projectIds.length > 0) {
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
    projectIds: []
};

