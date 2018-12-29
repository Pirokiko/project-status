import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Col, Row} from 'antd';
import {ProjectConsumer, ProjectProviderLoader} from '../../providers/Project'
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
                        <Link to={'/sprint/' + sprint.id}>
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

const Project = withRouter(({history, location, match, ...props}) => (
    <ProjectConsumer id={match.params.id}>
        {(project) => {
            if(!project) return null;

            return <ProjectPageComponent {...props} project={project} />
        }}
    </ProjectConsumer>
));
Project.propTypes = {};
Project.defaultProps = {};

export const ProjectPage = compose(
    withLoader(ProjectProviderLoader),
    withLoader(SprintProviderLoader),
    withBreadcrumb('project', 'Project'),
    withModals(modalName),
    withPageActions(
        ({ project }) => `Project: ${project && project.name}`,
        ({ showModal }) => (
            <PrimaryButton onClick={() => showModal(modalName)}>
                Add Sprint
            </PrimaryButton>
        )
    )
)(Project);