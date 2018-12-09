import React from 'react';

import SprintStatusEnum from '../../lib/SprintStatusEnum'
import {StatusTag} from './StatusTag'

export const SprintStatusTag = ({ sprint, onChange }) => (
    <StatusTag values={Object.values(SprintStatusEnum)} onChange={onChange} status={sprint.status}/>
)