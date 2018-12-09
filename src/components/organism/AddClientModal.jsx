import React from 'react';
import PropTypes from 'prop-types';
import {Input, Modal} from 'antd'
import {uploadClient} from '../../lib/api'

export class AddClientModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmLoading: false,
            name: '',
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk = () => {
        uploadClient({
            name: this.state.name,
        })
            .then(() => this.setState({
                confirmLoading: false,
                name: ''
            }, () => {
                this.props.onClose();
            }))
    }

    handleCancel = () => {
        this.props.onClose();
    }

    render(){
        return (
            <Modal
                title="Add a client"
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
            >
                <Input addonBefore={'Name'} type={'text'} value={this.state.name} onChange={e => this.setState({
                    name: e.target.value,
                })} />
            </Modal>
        );
    }
}

AddClientModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
AddClientModal.defaultProps = {};