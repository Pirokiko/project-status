import React from 'react';

import ProjectStatusEnum from '../../lib/ProjectStatusEnum'
import {StatusTag} from './StatusTag'

export const ProjectStatusTag = ({ project, onChange }) => (
    <StatusTag values={Object.values(ProjectStatusEnum)} onChange={onChange} status={project.status}/>
)