import React from 'react';
import PropTypes from 'prop-types';

import SprintStatusEnum from '../../lib/SprintStatusEnum'
import {StatusTag} from './StatusTag'


const SprintBasedStatusEnum = {
    INACTIVE: 'INACTIVE',
    WAITING: 'WAITING',
    ACTIVE: 'ACTIVE',
};

const isWaiting = sprint => [SprintStatusEnum.FUTURE].includes(sprint.status);

const isActive = sprint => [
    SprintStatusEnum.PLANNED,
    SprintStatusEnum.ACTIVE,
    SprintStatusEnum.IN_REVIEW,
    SprintStatusEnum.FINALIZING,
].includes(sprint.status);

const getClientStatus = (sprints) => {
    if(sprints.length === 0){
        return SprintBasedStatusEnum.INACTIVE;
    }

    if(sprints.some(sprint => isActive(sprint))){
        return SprintBasedStatusEnum.ACTIVE;
    }

    if(sprints.some(sprint => isWaiting(sprint))){
        return SprintBasedStatusEnum.WAITING;
    }

    return SprintBasedStatusEnum.INACTIVE;
};

export const SprintBasedStatusTag = ({ sprints, onChange }) => (
    <StatusTag
        status={getClientStatus(sprints)}
        values={Object.values(SprintBasedStatusEnum)}
        onChange={onChange}
        noChange={true}
    />
)
SprintBasedStatusTag.propTypes = {
    sprints: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    noChange: PropTypes.bool,
};
SprintBasedStatusTag.defaultProps = {
    onChange: () => {},
    noChange: false,
};