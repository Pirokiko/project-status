import React from 'react';
import {BasePageConsumer} from '../providers/BasePage'

function withPageActionsWrapper(WrappedComponent, title, actionButtons) {
    class DummyComponent extends React.Component {
        componentDidMount() {
            this.props.setTitle(typeof title === 'function' ? title(this.props.props) : title);
            this.props.setActionButtons(actionButtons(this.props.props));
        }

        componentWillUnmount() {
            this.props.setTitle('');
            this.props.setActionButtons(null);
        }

        render() {
            return this.props.children;
        }
    }

    const withPageActionsComponent = props => (
        <BasePageConsumer>
            {({ setTitle, setActionButtons }) => (
                <DummyComponent props={props}
                                setTitle={setTitle}
                                setActionButtons={setActionButtons}>
                    <WrappedComponent {...props} />
                </DummyComponent>
            )}
        </BasePageConsumer>
    );

    withPageActionsComponent.displayName = `withPageActions(${getDisplayName(WrappedComponent)})`;
    return withPageActionsComponent;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withPageActions(title, actionButtons = () => null) {
    return function (WrappedComponent) {
        return withPageActionsWrapper(WrappedComponent, title, actionButtons);
    };
}