import React from 'react';
import {ClientConsumer} from '../providers/Client'

function withClientWrapper(WrappedComponent, clientId, dontRenderUntillValue) {
    const withClientComponent = props => (
        <ClientConsumer id={typeof clientId === 'function' ? clientId(props) : clientId}>
            {(client) => {
                if(dontRenderUntillValue && !client) return null;
                return <WrappedComponent {...props} client={client} />;
            }}
        </ClientConsumer>
    )
    withClientComponent.displayName = `withClient(${getDisplayName(WrappedComponent)})`;
    return withClientComponent;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withClient(clientId, dontRenderUntillValue = false) {
    return function (WrappedComponent) {
        return withClientWrapper(WrappedComponent, clientId, dontRenderUntillValue);
    };
}