import React from 'react';

import SprintDocumentStatusEnum from '../../lib/SprintDocumentStatusEnum';
import {StatusTag} from './StatusTag'

const options = {
    ...SprintDocumentStatusEnum,
};
delete options.NONE;

const getText = status => {
    switch (status) {
        case SprintDocumentStatusEnum.APPROVED:
            return 'Approved';
        case SprintDocumentStatusEnum.SUBMITTED:
            return 'Submitted';
        case SprintDocumentStatusEnum.DRAFT:
            return 'Draft';
        case SprintDocumentStatusEnum.NONE:
        default:
            return 'None';
    }
};

export const DocumentStatusTag = ({ document, onChange }) => (
    <StatusTag values={Object.values(options)} onChange={onChange} status={document.status} getText={getText}/>
)