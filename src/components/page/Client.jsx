import React from 'react';
import {BasicPage} from './BasicPage'
import {Button, Col, Row} from 'antd'
import {ClientConsumer} from '../providers/Client'
import {Link, withRouter} from 'react-router-dom'
import {ClientCard} from '../molecule/ClientCard'
import {ProjectConsumer} from '../providers/Project'
import {ProjectCard} from '../molecule/ProjectCard'

const ClientPage = ({id}) => (
    <ClientConsumer id={id}>
        {(client) => {
            if (!client) return null;
            return (
                <BasicPage title={client.name} actionButtons={() => (
                    <Button type={'primary'} onClick={() => alert('show modal to add project')}>
                        Add Project
                    </Button>
                )}>
                    <ClientCard client={client}/>
                    <br/>
                    <h1>Projects</h1>
                    <Row gutter={16}>
                        <ProjectConsumer clientId={client.id}>
                            {(projects) => projects.map(project => (
                                <Col span={8}>
                                    <Link to={'/project/' + project.id}>
                                        <ProjectCard project={project} />
                                    </Link>
                                </Col>
                            ))}
                        </ProjectConsumer>
                    </Row>
                </BasicPage>
            );
        }}
    </ClientConsumer>
);

export const Client = withRouter(({match}) => <ClientPage id={match.params.id}/>)

Client.propTypes = {};
Client.defaultProps = {};