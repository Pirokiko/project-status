import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Icon, message} from 'antd'
import {FaFile} from 'react-icons/fa'

import {SprintStatusTag} from './SprintStatusTag'
import {uploadSprint} from '../../lib/api'
import {getFileUrl} from '../../lib/files-server'
import {FileServerUpload} from '../atom/FileServerUpload'
import SprintDocumentStatusEnum  from '../../lib/SprintDocumentStatusEnum'
import {DocumentStatusTag} from './DocumentStatusTag'
import SprintStatusEnum from '../../lib/SprintStatusEnum'
import {TaskConsumer} from '../providers/Task'

const validateForErrors = (status, sprint, tasks) => {
    switch(status){
        case SprintStatusEnum.FUTURE:
        case SprintStatusEnum.PLANNED:
            return null;
        case SprintStatusEnum.ACTIVE:
            if(sprint.document.status !== SprintDocumentStatusEnum.APPROVED){
                return 'You must first have a sprint document approved before starting active work on the sprint';
            }
            return null;
        case SprintStatusEnum.IN_REVIEW:
            if(tasks.length === 0){
                return 'How can you review something when no tasks have been defined';
            }
            if(tasks.filter(task => !task.completed).length > 0){
                return 'You\'re not done yet with all the tasks, complete them before letting the client review your work';
            }
            return null;
        case SprintStatusEnum.FINALIZING:
            return null; //This is not an actual thing (should remove it as a status)
        case SprintStatusEnum.FINISHED:
            if(sprint.status === SprintStatusEnum.IN_REVIEW || sprint.status === SprintStatusEnum.FINALIZING){
                return null;
            }
            return 'Can\t skip state, walk through the different states properly';
        default:
            return 'Not allowed';
    }
}

const uploadStatus = (status, sprint, tasks) => {
    const error = validateForErrors(status, sprint, tasks);
    if(error){
        return message.error(error);
    }
    updateSprint(sprint, 'status', status);
}

const updateSprint = (sprint, key, value) => uploadSprint({
    ...sprint,
    [key] : value,
})

const getNewDocumentStatus = status => {
    if(status === SprintDocumentStatusEnum.NONE){
        return SprintDocumentStatusEnum.DRAFT;
    }
    return status;
};

const getNewDocument = (document, uuid) => ({
    ...document,
    status: getNewDocumentStatus(document.status),
    data: uuid,
});

const DocumentView = ({sprint, document}) => (
    <div>
        <div>Document: {document.data && <a href={getFileUrl(document.data)}><FaFile /></a>}</div>
        <div>Status: <DocumentStatusTag document={document} onChange={status => updateSprint(sprint, 'document', {
            ...document,
            status,
        })} /></div>
        {document.status !== SprintDocumentStatusEnum.APPROVED && <FileServerUpload
            onFileUploaded={uuid => { updateSprint(sprint, 'document', getNewDocument(document, uuid))}}
            onError={errors => { message.error('File upload failed: '+errors.join('\n')) }}
        >
            <Button>
                <Icon type="upload" /> Click to Upload
            </Button>
        </FileServerUpload>}
    </div>
);

export const SprintCard = ({sprint, ...props}) => (
    <TaskConsumer sprintIds={[sprint.id]}>
        {(tasks) => (
            <Card {...props}
                  title={sprint.name}
                  extra={<SprintStatusTag sprint={sprint} onChange={status => uploadStatus(status, sprint, tasks)}/>}
            >
                <div>Nr: {sprint.nr}</div>
                <DocumentView sprint={sprint} document={sprint.document} />
            </Card>
        )}
    </TaskConsumer>
);

SprintCard.propTypes = {
    sprint: PropTypes.object.isRequired,
};
SprintCard.defaultProps = {};