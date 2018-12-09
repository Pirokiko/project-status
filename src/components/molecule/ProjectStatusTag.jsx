import React from 'react';

import {StatusTag} from './StatusTag'
import {SprintConsumer} from '../providers/Sprint'
import SprintStatusEnum from '../../lib/SprintStatusEnum'

const ProjectStatusEnum = {
    INACTIVE: 'INACTIVE',
    WAITING: 'WAITING',
    ACTIVE: 'ACTIVE',
};

const isWaiting = sprint => [SprintStatusEnum.FUTURE, SprintStatusEnum.FINISHED].includes(sprint.status);

const isActive = sprint => [
    SprintStatusEnum.PLANNED,
    SprintStatusEnum.ACTIVE,
    SprintStatusEnum.IN_REVIEW,
    SprintStatusEnum.FINALIZING,
].includes(sprint.status);

const getClientStatus = (sprints) => {
    if(sprints.length === 0){
        return ProjectStatusEnum.INACTIVE;
    }

    if(sprints.every(sprint => isWaiting(sprint))){
        return ProjectStatusEnum.WAITING;
    }

    if(sprints.some(sprint => isActive(sprint))){
        return ProjectStatusEnum.ACTIVE;
    }

    return ProjectStatusEnum.INACTIVE;
};

export const ProjectStatusTag = ({ project, onChange }) => (
    <SprintConsumer projectIds={[project.id]}>
        {sprints => (
            <StatusTag
                values={Object.values(ProjectStatusEnum)}
                onChange={onChange}
                noChange={true}
                status={getClientStatus(sprints)}
            />
        )}
    </SprintConsumer>
)