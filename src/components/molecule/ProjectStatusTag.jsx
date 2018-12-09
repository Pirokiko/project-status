import React from 'react';

import ProjectStatusEnum from '../../lib/ProjectStatusEnum'
import {EntityStatusTag} from './EntityStatusTag'

export const ProjectStatusTag = ({ project, onChange }) => (
    <EntityStatusTag values={Object.values(ProjectStatusEnum)} onChange={onChange} entity={project}/>
)