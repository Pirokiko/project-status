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
    }

    componentDidMount() {
        //setup the api call, subscribe to websocket for changes, etc ......
        getSprints()
            .then(sprints => this.setState({sprints}))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <Provider {...this.props} value={this.state.sprints}/>
        );
    }
}
SprintProvider.propTypes = {};
SprintProvider.defaultProps = {};

export const SprintConsumer = ({id, projectId, children: renderFunc}) => (
    <Consumer>
        {(sprints) => {
            if(id){
                return renderFunc(sprints.find(sprint => sprint.id === id));
            }
            if (projectId) {
                sprints = sprints.filter(sprint => sprint.projectId === projectId);
            }
            return renderFunc(sprints);
        }}
    </Consumer>
);
SprintConsumer.propTypes = {
    id: PropTypes.string,
    projectId: PropTypes.string,
};
SprintConsumer.defaultProps = {
    id: null,
    projectId: null
};

