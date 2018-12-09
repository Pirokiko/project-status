import React from 'react';

import {StatusTag} from './StatusTag'
import {ProjectConsumer} from '../providers/Project'
import {SprintConsumer} from '../providers/Sprint'
import SprintStatusEnum from '../../lib/SprintStatusEnum'

const ClientStatusEnum = {
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
        return ClientStatusEnum.INACTIVE;
    }

    if(sprints.every(sprint => isWaiting(sprint))){
        return ClientStatusEnum.WAITING;
    }

    if(sprints.some(sprint => isActive(sprint))){
        return ClientStatusEnum.ACTIVE;
    }

    return ClientStatusEnum.INACTIVE;
};

export const ClientStatusTag = ({ client, onChange }) => (
    <ProjectConsumer clientIds={[client.id]}>
        {projects => (
            <SprintConsumer projectIds={projects.map(project => project.id)}>
                {sprints => (
                    <StatusTag
                        status={getClientStatus(sprints)}
                        values={Object.values(ClientStatusEnum)}
                        onChange={onChange}
                        noChange={true}
                    />
                )}
            </SprintConsumer>
        )}
    </ProjectConsumer>
)