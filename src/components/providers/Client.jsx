import React from 'react';
import PropTypes from 'prop-types';
import {getClients} from '../../lib/api'

const { Provider, Consumer } = React.createContext();

export class ClientProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clients: []
        };

        this.refreshClients = this.refreshClients.bind(this);
    }

    refreshClients(){
        getClients()
            .then(clients => this.setState({clients}))
            .catch(err => console.error(err));
    }

    componentDidMount(){
        this.refreshClients();

        document.addEventListener('client.changed', this.refreshClients);
    }

    render(){
        return (
            <Provider {...this.props} value={this.state.clients} />
        );
    }
}
ClientProvider.propTypes = {};
ClientProvider.defaultProps = {};

export const ClientConsumer = ({id, children: renderFunc}) => (
    <Consumer>
        {(clients) => {
            if (id) {
                return renderFunc(clients.find(client => client.id === id));
            }
            return renderFunc(clients);
        }}
    </Consumer>
);
ClientConsumer.propTypes = {
    id: PropTypes.string,
};
ClientConsumer.defaultProps = {
    id: null,
};

