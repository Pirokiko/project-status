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
        this.loaded = false;

        this.refreshClients = this.refreshClients.bind(this);
        this.load = this.load.bind(this);
    }

    refreshClients(){
        getClients()
            .then(clients => this.setState({clients}))
            .catch(err => console.error(err));
    }

    load(){
        if(!this.loaded){
            this.loaded = true;
            this.refreshClients();
        }
    }

    componentDidMount(){
        setTimeout(this.load,10000);

        document.addEventListener('client.changed', this.refreshClients);
    }

    render(){
        return (
            <Provider {...this.props} value={{
                clients: this.state.clients,
                load: this.load,
            }} />
        );
    }
}
ClientProvider.propTypes = {};
ClientProvider.defaultProps = {};

export const ClientConsumer = ({id, children: renderFunc}) => (
    <Consumer>
        {({clients}) => {
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

export const ClientProviderLoader = ({ children: renderFunc }) => (
    <Consumer>
        {({ load }) => renderFunc(load)}
    </Consumer>
);

