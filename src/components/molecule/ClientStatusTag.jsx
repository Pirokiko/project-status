import React from 'react';

import {ProjectConsumer} from '../providers/Project'
import {SprintConsumer} from '../providers/Sprint'
import {SprintBasedStatusTag} from './SprintBasedStatusTag'

export const ClientStatusTag = ({ client, onChange }) => (
    <ProjectConsumer clientIds={[client.id]}>
        {projects => (
            <SprintConsumer projectIds={projects.map(project => project.id)}>
                {sprints => (
                    <SprintBasedStatusTag sprints={sprints} onChange={onChange} noChange={true}/>
                )}
            </SprintConsumer>
        )}
    </ProjectConsumer>
)