import React from 'react';

function buildState(...modalNames){
    const result = {};
    modalNames.forEach(modalName => result[modalName] = false);
    return result;
}

function withModalsWrapper(WrappedComponent, ...modalNames) {
    //Do something with your vars
    class withModalsClass extends React.Component {
        constructor(props){
            super(props);
            this.state = buildState(...modalNames);
            this.showModal = this.showModal.bind(this);
            this.hideModal = this.hideModal.bind(this);
            this.isModalOpen = this.isModalOpen.bind(this);
        }

        isModalOpen(modalName){
            return this.state[modalName];
        }

        showModal(modalName){
            this.updateModalVisibility(modalName, true);
        }

        hideModal(modalName){
            this.updateModalVisibility(modalName, false);
        }

        updateModalVisibility(modalName, value){
            this.setState({
                [modalName]: value,
            });
        }

        render() {
            return <WrappedComponent
                {...this.props}
                showModal={this.showModal}
                hideModal={this.hideModal}
                isModalOpen={this.isModalOpen}
            />;
        }
    }

    withModalsClass.displayName = `withModals(${getDisplayName(WrappedComponent)})`;
    return withModalsClass;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withModals(...modalNames) {
    return function (WrappedComponent) {
        return withModalsWrapper(WrappedComponent, ...modalNames);
    };
}