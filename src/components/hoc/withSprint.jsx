import React from 'react';
import {SprintConsumer} from '../providers/Sprint'

function withSprintWrapper(WrappedComponent, sprintId, dontRenderUntillValue) {
    const withSprintComponent = props => (
        <SprintConsumer id={typeof sprintId === 'function' ? sprintId(props) : sprintId}>
            {(sprint) => {
                if(dontRenderUntillValue && !sprint) return null;
                return <WrappedComponent {...props} sprint={sprint} />;
            }}
        </SprintConsumer>
    )
    withSprintComponent.displayName = `withSprint(${getDisplayName(WrappedComponent)})`;
    return withSprintComponent;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withSprint(sprintId, dontRenderUntillValue = false) {
    return function (WrappedComponent) {
        return withSprintWrapper(WrappedComponent, sprintId, dontRenderUntillValue);
    };
}