import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd'

import {ProjectConsumer} from '../providers/Project'

import ProjectStatusEnum from '../../lib/ProjectStatusEnum';
const { FINISHED, ACTIVE, FUTURE } = ProjectStatusEnum;

const statusProjects = (projects, status) => projects.filter(project => project.status === status);

export const ClientCard = ({client, ...props}) => (
    <Card title={client.name} {...props}>
        <ProjectConsumer clientId={client.id}>
            {(projects) => (
                <React.Fragment>
                    <div>This client has {projects.length} projects</div>
                    <div>{statusProjects(projects, FINISHED).length} are finished</div>
                    <div>{statusProjects(projects, ACTIVE).length} are active</div>
                    <div>{statusProjects(projects, FUTURE).length} are future projects</div>
                </React.Fragment>
            )}
        </ProjectConsumer>
    </Card>
);

ClientCard.propTypes = {
    client: PropTypes.object.isRequired,
};
ClientCard.defaultProps = {};