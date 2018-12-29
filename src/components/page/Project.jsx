import React from 'react';
import {Button} from 'antd'
import { Col, Row } from 'antd';

import {BasicPage} from './BasicPage'
import {ProjectConsumer} from '../providers/Project'
import {Link, withRouter} from 'react-router-dom'
import {ProjectCard} from '../molecule/ProjectCard'
import {SprintConsumer} from '../providers/Sprint'
import {SprintCard} from '../molecule/SprintCard'
import {AddSprintModal} from '../organism/AddSprintModal'
import {withBreadcrumb} from '../hoc/withPageBreadcrumb'
import {compose} from '../../lib/compose'
import {withModals} from '../hoc/withModals'

const modalName = 'sprint';

const ProjectPageClass = ({ id, showModal, hideModal, isModalOpen }) => (
    <ProjectConsumer id={id}>
        {(project) => {
            if(!project) return null;
            return (
                <React.Fragment>
                    <BasicPage title={project.name} actionButtons={() => (
                        <Button htmlType={'button'} type={'primary'} onClick={() => showModal(modalName)}>
                            Add Sprint
                        </Button>
                    )}>
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
                    </BasicPage>
                    <AddSprintModal
                        project={project}
                        visible={isModalOpen(modalName)}
                        onClose={() => hideModal(modalName)}
                    />
                </React.Fragment>
            );
        }}
    </ProjectConsumer>
);
const ProjectPage = compose(
    withBreadcrumb('project', 'Project'),
    withModals(modalName),
)(ProjectPageClass);

export const Project = withRouter(({match}) => <ProjectPage id={match.params.id}/>)

Project.propTypes = {};
Project.defaultProps = {};