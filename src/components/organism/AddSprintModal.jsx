import React from 'react';
import PropTypes from 'prop-types';
import {Input, Modal} from 'antd'
import {uploadSprint} from '../../lib/api'
import SprintStatusEnum from '../../lib/SprintStatusEnum'
import {SprintConsumer} from '../providers/Sprint'

const getSprintNumber = sprints => {
    let nr = 0;
    sprints.forEach(sprint => {
        if(sprint.nr > nr){
            nr = sprint.nr;
        }
    })

    return nr + 1;
}

export class AddSprintModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            project: {
                name: '',
                nr: 0,
            },
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk(nr) {
        uploadSprint({
            ...this.state.project,
            nr: nr,
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
                    nr: 0,
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
            <SprintConsumer projectIds={[this.props.project.id]}>
                {sprints => (
                    <Modal
                        title={`Add a sprint to ${this.props.project.name}`}
                        visible={this.props.visible}
                        onOk={this.handleOk.bind(this, getSprintNumber(sprints))}
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
                               disabled={true}
                               value={getSprintNumber(sprints)}
                               onChange={e => this.setField('nr', parseInt(e.target.value, 10))}
                        />
                    </Modal>
                )}
            </SprintConsumer>
        );
    }
}

AddSprintModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
};
AddSprintModal.defaultProps = {};