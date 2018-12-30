import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Col, Row} from 'antd';
import {ProjectProviderLoader} from '../../providers/Project'
import {ProjectCard} from '../../molecule/ProjectCard'
import {SprintConsumer, SprintProviderLoader} from '../../providers/Sprint'
import {SprintCard} from '../../molecule/SprintCard'
import {AddSprintModal} from '../../organism/AddSprintModal'
import {compose} from '../../../lib/compose'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {withModals} from '../../hoc/withModals'
import {withLoader} from '../../hoc/withLoader'
import {withPageActions} from '../../hoc/withPageActions'
import {PrimaryButton} from '../../atom/PrimaryButton'
import {withProject} from '../../hoc/withProject'

const modalName = 'sprint';

const ProjectPageComponent = ({ project, isModalOpen, hideModal }) => (
    <React.Fragment>
        <ProjectCard project={project}/>
        <br/>
        <h1>Sprints</h1>
        <Row gutter={16}>
            <SprintConsumer projectIds={[project.id]}>
                {(sprints) => sprints.map(sprint => (
                    <Col key={sprint.id} span={8}>
                        <Link to={'/sprint/' + sprint.id} >
                            <SprintCard sprint={sprint} style={{marginBottom: 16}} />
                        </Link>
                    </Col>
                ))}
            </SprintConsumer>
        </Row>
        <AddSprintModal
            project={project}
            visible={isModalOpen(modalName)}
            onClose={() => hideModal(modalName)}
        />
    </React.Fragment>
);

export const ProjectPage = compose(
    withLoader(ProjectProviderLoader),
    withLoader(SprintProviderLoader),
    withBreadcrumb('project', 'Project'),
    withModals(modalName),
    withRouter,
    withProject(props => props.match.params.id, true),
    withPageActions(
        ({ project }) => `Project: ${project && project.name}`,
        ({ showModal }) => (
            <PrimaryButton onClick={() => showModal(modalName)}>
                Add Sprint
            </PrimaryButton>
        )
    ),
)(ProjectPageComponent);