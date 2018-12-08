import React from 'react';
import PropTypes from 'prop-types';
import {Card, Tag} from 'antd'

import SprintStatusEnum from '../../lib/SprintStatusEnum';

import SprintDocumentStatusEnum from '../../lib/SprintDocumentStatusEnum';
const {
    NON_EXISTENT,
} = SprintDocumentStatusEnum;

const colorForStatus = (status) => {
    switch (status) {
        case SprintStatusEnum.ACTIVE:
            return 'orange';
        case SprintStatusEnum.FINALIZING:
            return 'lime';
        case SprintStatusEnum.FINISHED:
            return 'green';
        case SprintStatusEnum.FUTURE:
            return 'cyan';
        case SprintStatusEnum.IN_REVIEW:
            return 'geekblue';
        case SprintStatusEnum.PLANNED:
            return 'blue';
        default:
            return '#888888';
    }
};

export const SprintCard = ({sprint, ...props}) => (
    <Card {...props}
        title={sprint.name}
          extra={<Tag color={colorForStatus(sprint.status)}>{sprint.status}</Tag>}
    >
        <div>Nr: {sprint.nr}</div>
        <div>Document: {sprint.document.status === NON_EXISTENT ? "Not available" : sprint.document.status}</div>
    </Card>
);

SprintCard.propTypes = {
    sprint: PropTypes.object.isRequired,
};
SprintCard.defaultProps = {};