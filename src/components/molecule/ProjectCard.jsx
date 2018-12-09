import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd'

import SprintStatusEnum from '../../lib/SprintStatusEnum';
import {SprintConsumer} from '../providers/Sprint'
import {ProjectStatusTag} from './ProjectStatusTag'
import {uploadProject} from '../../lib/api'

const {FINISHED, ACTIVE, FUTURE} = SprintStatusEnum;

const statusSprints = (sprints, status) => sprints.filter(sprint => sprint.status === status);

const uploadStatus = (status, project) => uploadProject({
    ...project,
    status,
});

export const ProjectCard = ({project, ...props}) => (
    <Card {...props}
          title={project.name}
          extra={<ProjectStatusTag project={project} onChange={status => uploadStatus(status, project)}/>}
    >
        <SprintConsumer projectIds={[project.id]}>
            {(sprints) => (
                <React.Fragment>
                    <div>This project has {sprints.length} sprints</div>
                    <div>{statusSprints(sprints, FINISHED).length} are finished</div>
                    <div>{statusSprints(sprints, ACTIVE).length} are active</div>
                    <div>{statusSprints(sprints, FUTURE).length} are future sprints</div>
                </React.Fragment>
            )}
        </SprintConsumer>
    </Card>
);

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
};
ProjectCard.defaultProps = {};