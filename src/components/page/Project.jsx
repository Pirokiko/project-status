import React from 'react';
import {Button} from 'antd'
import { Col, Row } from 'antd';

import {BasicPage} from './BasicPage'
import {ProjectConsumer} from '../providers/Project'
import {withRouter} from 'react-router-dom'
import {ProjectCard} from '../molecule/ProjectCard'
import {SprintConsumer} from '../providers/Sprint'
import {SprintCard} from '../molecule/SprintCard'

const ProjectPage = ({id}) => (
    <ProjectConsumer id={id}>
        {(project) => {
            if(!project) return null;
            return (
                <BasicPage title={project.name} actionButtons={() => (
                    <Button type={'primary'} onClick={() => alert('show modal to add sprint')}>
                        Add Sprint
                    </Button>
                )}>
                    <ProjectCard project={project}/>
                    <br/>
                    <h1>Sprints</h1>
                    <Row gutter={16}>
                        <SprintConsumer projectId={project.id}>
                            {(sprints) => sprints.map(sprint => (
                                <Col key={sprint.id} span={8}>
                                    <SprintCard sprint={sprint} style={{marginBottom: 16}} />
                                </Col>
                            ))}
                        </SprintConsumer>
                    </Row>
                </BasicPage>
            );
        }}
    </ProjectConsumer>
);

export const Project = withRouter(({match}) => <ProjectPage id={match.params.id}/>)

Project.propTypes = {};
Project.defaultProps = {};