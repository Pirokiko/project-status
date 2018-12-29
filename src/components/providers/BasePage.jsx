import React from 'react';

const {Provider, Consumer} = React.createContext({
    title: '',
    actionButtons: null,
    setTitle: () => {},
    setActionButtons: () => {},
});

export class BasePageProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            actionButtons: null,
        };

        this.setTitle = this.setTitle.bind(this);
        this.setActionButtons = this.setActionButtons.bind(this);
    }

    setTitle(title){
        this.setState({ title });
    }

    setActionButtons(actionButtons){
        this.setState({ actionButtons });
    }

    render() {
        return (
            <Provider {...this.props} value={{
                title: this.state.title,
                actionButtons: this.state.actionButtons,

                setTitle: this.setTitle,
                setActionButtons: this.setActionButtons,
            }}/>
        );
    }
}

BasePageProvider.propTypes = {};
BasePageProvider.defaultProps = {};

export const BasePageConsumer = Consumer;
BasePageConsumer.propTypes = {};
BasePageConsumer.defaultProps = {};

