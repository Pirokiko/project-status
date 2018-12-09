import React from 'react';

import {SprintConsumer} from '../providers/Sprint'
import {SprintBasedStatusTag} from './SprintBasedStatusTag'

export const ProjectStatusTag = ({ project, onChange }) => (
    <SprintConsumer projectIds={[project.id]}>
        {sprints => (
            <SprintBasedStatusTag sprints={sprints} onChange={onChange} noChange={true}/>
        )}
    </SprintConsumer>
)