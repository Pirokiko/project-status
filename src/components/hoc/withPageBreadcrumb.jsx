import React from 'react';
import {withBreadcrumbSetter} from '../providers/Breadcrumb'

function withPageBreadcrumb(WrappedComponent, breadcrumbKey, reactNode) {
    class WithPageBreadcrumb extends React.Component {
        componentDidMount() {
            this.props.setBreadcrumb(breadcrumbKey, reactNode);
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    WithPageBreadcrumb.displayName = `WithPageBreadcrumb(${getDisplayName(WrappedComponent)})`;
    return withBreadcrumbSetter(WithPageBreadcrumb);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withBreadcrumb(breadcrumbKey, reactNode){
    return function(WrappedComponent){
        return withPageBreadcrumb(WrappedComponent, breadcrumbKey, reactNode);
    };
}