import React from 'react';
import PropTypes from 'prop-types';
import {Input, Modal} from 'antd'
import {uploadSprint} from '../../lib/api'
import SprintStatusEnum from '../../lib/SprintStatusEnum'

export class AddSprintModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            project: {
                name: '',
                nr: '0',
            },
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk() {
        uploadSprint({
            ...this.state.project,
            projectId: this.props.project.id,
            status: SprintStatusEnum.FUTURE,
            document: {
                status: 'NON-EXISTENT',
                name: null,
                data: null,
            },
        })
            .then(() => this.setState({
                confirmLoading: false,
                project: {
                    name: '',
                    nr: '0',
                },
            }, () => {
                this.props.onClose();
            }))
    }

    handleCancel() {
        this.props.onClose();
    }

    setField(field, value) {
        this.setState({
            project: {
                ...this.state.project,
                [field]: value,
            },
        })
    }

    render() {
        return (
            <Modal
                title={`Add a sprint to ${this.props.project.name}`}
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
            >
                <Input addonBefore={'Name'}
                       type={'text'}
                       value={this.state.project.name}
                       onChange={e => this.setField('name', e.target.value)}
                />
                <Input addonBefore={'Nr'}
                       type={'number'}
                       value={this.state.project.nr}
                       onChange={e => this.setField('nr', e.target.value)}
                />


            </Modal>
        );
    }
}

AddSprintModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
};
AddSprintModal.defaultProps = {};