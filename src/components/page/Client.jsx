import React from 'react';
import {BasicPage} from './BasicPage'
import {Button, Col, Row} from 'antd'
import {ClientConsumer} from '../providers/Client'
import {Link, withRouter} from 'react-router-dom'
import {ClientCard} from '../molecule/ClientCard'
import {ProjectConsumer} from '../providers/Project'
import {ProjectCard} from '../molecule/ProjectCard'
import {AddProjectModal} from '../organism/AddProjectModal'
import {withBreadcrumb} from '../hoc/withPageBreadcrumb'
import {compose} from '../../lib/compose'
import {withModals} from '../hoc/withModals'

const modalName = 'project';

const ClientPageView = ({ id, showModal, hideModal, isModalOpen }) => (
    <ClientConsumer id={id}>
        {(client) => {
            if (!client) return null;
            return (
                <React.Fragment>
                    <BasicPage title={client.name} actionButtons={() => (
                        <Button htmlType={'button'} type={'primary'} onClick={() => showModal(modalName)}>
                            Add Project
                        </Button>
                    )}>
                        <ClientCard client={client}/>
                        <br/>
                        <h1>Projects</h1>
                        <Row gutter={16}>
                            <ProjectConsumer clientIds={[id]}>
                                {(projects) => projects.map(project => (
                                    <Col key={project.id} span={8}>
                                        <Link to={'/project/' + project.id}>
                                            <ProjectCard project={project}/>
                                        </Link>
                                    </Col>
                                ))}
                            </ProjectConsumer>
                        </Row>
                    </BasicPage>
                    <AddProjectModal
                        client={client}
                        visible={isModalOpen(modalName)}
                        onClose={() => hideModal(modalName)}
                    />
                </React.Fragment>
            );
        }}
    </ClientConsumer>
);

const ClientPage = compose(
    withBreadcrumb('client', 'Client'),
    withModals(modalName)
)(ClientPageView);

export const Client = withRouter(({match}) => <ClientPage id={match.params.id}/>)

Client.propTypes = {};
Client.defaultProps = {};