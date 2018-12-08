import React from 'react';
import PropTypes from 'prop-types';
import {Card, Tag} from 'antd'

import ProjectStatusEnum from '../../lib/ProjectStatusEnum';
import SprintStatusEnum from '../../lib/SprintStatusEnum';
import {SprintConsumer} from '../providers/Sprint'

const {FINISHED, ACTIVE, FUTURE} = SprintStatusEnum;

const statusSprints = (sprints, status) => sprints.filter(sprint => sprint.status === status);

const colorForStatus = (status) => {
    switch (status) {
        case ProjectStatusEnum.ACTIVE:
            return 'orange';
        case ProjectStatusEnum.FINISHED:
            return 'green';
        case ProjectStatusEnum.FUTURE:
            return 'cyan';
        default:
            return '#888888';
    }
};

export const ProjectCard = ({project, ...props}) => (
    <Card {...props}
          title={project.name}
          extra={<Tag color={colorForStatus(project.status)}>{project.status}</Tag>}
    >
        <SprintConsumer projectId={project.id}>
            {(sprints) => (
                <React.Fragment>
                    <div>This project has {sprints.length} sprints</div>
                    <div>{statusSprints(sprints, FINISHED).length} are finished</div>
                    <div>{statusSprints(sprints, ACTIVE).length} are active</div>
                    <div>{statusSprints(sprints, FUTURE).length} are future projects</div>
                </React.Fragment>
            )}
        </SprintConsumer>
    </Card>
);

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
};
ProjectCard.defaultProps = {};