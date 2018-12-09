import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd'

import SprintDocumentStatusEnum from '../../lib/SprintDocumentStatusEnum';
import {SprintStatusTag} from './SprintStatusTag'
import {uploadSprint} from '../../lib/api'
const { NON_EXISTENT } = SprintDocumentStatusEnum;

const uploadStatus = (status, sprint) => uploadSprint({
    ...sprint,
    status,
});

export const SprintCard = ({sprint, ...props}) => (
    <Card {...props}
          title={sprint.name}
          extra={<SprintStatusTag sprint={sprint} onChange={status => uploadStatus(status, sprint)}/>}
    >
        <div>Nr: {sprint.nr}</div>
        <div>Document: {sprint.document.status === NON_EXISTENT ? "Not available" : sprint.document.status}</div>
    </Card>
);

SprintCard.propTypes = {
    sprint: PropTypes.object.isRequired,
};
SprintCard.defaultProps = {};