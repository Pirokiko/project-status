import React from 'react';

import {StatusTag} from './StatusTag'
import {ProjectConsumer} from '../providers/Project'
import {SprintConsumer} from '../providers/Sprint'

const ClientStatusEnum = {
    INACTIVE: 'INACTIVE',
    ACTIVE: 'ACTIVE',
};

const getClientStatus = (projects, sprints) => {
    if(projects.length === 0 || sprints.length === 0){
        return ClientStatusEnum.INACTIVE;
    }
    return ClientStatusEnum.ACTIVE;
};

export const ClientStatusTag = ({ client, onChange }) => (
    <ProjectConsumer clientIds={[client.id]}>
        {projects => (
            <SprintConsumer projectIds={projects.map(project => project.id)}>
                {sprints => (
                    <StatusTag
                        status={getClientStatus(projects, sprints)}
                        values={Object.values(ClientStatusEnum)}
                        onChange={onChange}
                        noChange={true}
                    />
                )}
            </SprintConsumer>
        )}
    </ProjectConsumer>
)