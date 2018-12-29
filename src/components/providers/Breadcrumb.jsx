import React from 'react';
import {getKeyListForBreadcrumbKey} from '../../lib/breadcrumbKeymap'

const {Provider, Consumer} = React.createContext({});

export class BreadcrumbProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: [],
            breadcrumbs: {},
        };

        this.setCurrentBreadcrumb = this.setCurrentBreadcrumb.bind(this);
    }

    setCurrentBreadcrumb(key, reactNode){
        const newData = {
            keys: getKeyListForBreadcrumbKey(key),
            breadcrumbs: {
                ...this.state.breadcrumbs,
                [key]: reactNode,
            }
        };
        this.setState(newData);
    }

    render() {
        return (
            <Provider {...this.props} value={{
                keys: this.state.keys,
                breadcrumbs: this.state.breadcrumbs,
                setBreadcrumb: this.setCurrentBreadcrumb,
            }}/>
        );
    }
}

BreadcrumbProvider.propTypes = {};
BreadcrumbProvider.defaultProps = {};

export const BreadcrumbConsumer = Consumer;
BreadcrumbConsumer.propTypes = {};
BreadcrumbConsumer.defaultProps = {};

export const withBreadcrumbSetter = (WrappedComponent) => props => <Consumer>
    {({ setBreadcrumb }) => <WrappedComponent {...props} setBreadcrumb={setBreadcrumb} /> }
</Consumer>;