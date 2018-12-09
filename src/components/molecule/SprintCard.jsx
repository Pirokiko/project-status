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

const uploadStatus = (status, sprint) => updateSprint(sprint, 'status', status);

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
        <FileServerUpload
            onFileUploaded={uuid => { updateSprint(sprint, 'document', getNewDocument(document, uuid))}}
            onError={errors => { message.error('File upload failed: '+errors.join('\n')) }}
        >
            <Button>
                <Icon type="upload" /> Click to Upload
            </Button>
        </FileServerUpload>
    </div>
);

export const SprintCard = ({sprint, ...props}) => (
    <Card {...props}
          title={sprint.name}
          extra={<SprintStatusTag sprint={sprint} onChange={status => uploadStatus(status, sprint)}/>}
    >
        <div>Nr: {sprint.nr}</div>
        <DocumentView sprint={sprint} document={sprint.document} />
    </Card>
);

SprintCard.propTypes = {
    sprint: PropTypes.object.isRequired,
};
SprintCard.defaultProps = {};