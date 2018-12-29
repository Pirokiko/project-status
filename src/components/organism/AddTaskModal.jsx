import React from 'react';
import PropTypes from 'prop-types';
import {Input, Modal} from 'antd'
import {uploadTask} from '../../lib/api'

export class AddTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            name: '',
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk() {
        uploadTask({
            completed: false,
            name: this.state.name,
            sprintId: this.props.sprint.id,
        })
            .then(() => this.setState({
                confirmLoading: false,
                name: '',
            }, () => {
                this.props.onClose();
            }))
    }

    handleCancel() {
        this.props.onClose();
    }

    render() {
        return (
            <Modal
                title={`Add a task to ${this.props.sprint.name}`}
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
            >
                <Input addonBefore={'Name'}
                       type={'text'}
                       value={this.state.name}
                       onChange={e => this.setState({ name: e.target.value })}
                />
            </Modal>
        );
    }
}

AddTaskModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    sprint: PropTypes.object.isRequired,
};
AddTaskModal.defaultProps = {};