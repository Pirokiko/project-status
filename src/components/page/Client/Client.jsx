import React from 'react';
import {Col, Row} from 'antd'
import {ClientProviderLoader} from '../../providers/Client'
import {Link, withRouter} from 'react-router-dom'
import {ClientCard} from '../../molecule/ClientCard'
import {ProjectConsumer, ProjectProviderLoader} from '../../providers/Project'
import {ProjectCard} from '../../molecule/ProjectCard'
import {AddProjectModal} from '../../organism/AddProjectModal'
import {withModals} from '../../hoc/withModals'
import {compose} from '../../../lib/compose'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {withLoader} from '../../hoc/withLoader'
import {withPageActions} from '../../hoc/withPageActions'
import {PrimaryButton} from '../../atom/PrimaryButton'
import {withClient} from '../../hoc/withClient'

const modalName = 'client';

const ClientPageComponent = ({ client, isModalOpen, hideModal }) => (
    <React.Fragment>
        <ClientCard client={client}/>
        <br/>
        <h1>Projects</h1>
        <Row gutter={16}>
            <ProjectConsumer clientIds={[client.id]}>
                {(projects) => projects.map(project => (
                    <Col key={project.id} span={8}>
                        <Link to={'/project/' + project.id}>
                            <ProjectCard project={project}/>
                        </Link>
                    </Col>
                ))}
            </ProjectConsumer>
        </Row>
        <AddProjectModal
            client={client}
            visible={isModalOpen(modalName)}
            onClose={() => hideModal(modalName)}
        />
    </React.Fragment>
)

export const ClientPage = compose(
    withLoader(ClientProviderLoader),
    withLoader(ProjectProviderLoader),
    withBreadcrumb('client', 'Client'),
    withModals(modalName),
    withRouter,
    withClient(({ match }) => match.params.id, true),
    withPageActions(({ client }) => `Client: ${client.name}`, props => (
        <PrimaryButton onClick={() => props.showModal(modalName)}>
            Add Project
        </PrimaryButton>
    ))
)(ClientPageComponent)
