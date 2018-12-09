import React from 'react';

import SprintStatusEnum from '../../lib/SprintStatusEnum'
import {EntityStatusTag} from './EntityStatusTag'

export const SprintStatusTag = ({ sprint, onChange }) => (
    <EntityStatusTag values={Object.values(SprintStatusEnum)} onChange={onChange} entity={sprint}/>
)