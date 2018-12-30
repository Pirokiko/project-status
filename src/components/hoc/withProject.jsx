import React from 'react';
import {ProjectConsumer} from '../providers/Project'

function withProjectWrapper(WrappedComponent, projectId, dontRenderUntillValue) {
    const withProjectComponent = props => (
        <ProjectConsumer id={typeof projectId === 'function' ? projectId(props) : projectId}>
            {(project) => {
                if(dontRenderUntillValue && !project) return null;
                return <WrappedComponent {...props} project={project} />;
            }}
        </ProjectConsumer>
    )
    withProjectComponent.displayName = `withProject(${getDisplayName(WrappedComponent)})`;
    return withProjectComponent;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withProject(projectId, dontRenderUntillValue = false) {
    return function (WrappedComponent) {
        return withProjectWrapper(WrappedComponent, projectId, dontRenderUntillValue);
    };
}