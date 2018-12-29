import React from 'react';
import {Col, Row} from 'antd'
import {Link} from 'react-router-dom'
import {ClientConsumer, ClientProviderLoader} from '../../providers/Client'
import {ClientCard} from '../../molecule/ClientCard'
import {AddClientModal} from '../../organism/AddClientModal'
import {compose} from '../../../lib/compose'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {withModals} from '../../hoc/withModals'
import {withLoader} from '../../hoc/withLoader'
import {withPageActions} from '../../hoc/withPageActions'
import {PrimaryButton} from '../../atom/PrimaryButton'

const modalName = 'client';

const Home = ({ isModalOpen, hideModal }) => (
    <React.Fragment>
        <Row gutter={16}>
        <ClientConsumer>
            {(clients) => clients.map(client => (
                <Col key={client.id} span={8}>
                <Link to={'/client/'+client.id}>
                    <ClientCard client={client} />
                </Link>
                </Col>
            ))}
        </ClientConsumer>
        </Row>
        <AddClientModal visible={isModalOpen(modalName)} onClose={() => hideModal(modalName)} />
    </React.Fragment>
);

export const HomePage = compose(
    withLoader(ClientProviderLoader),
    withBreadcrumb('home', 'Home'),
    withModals(modalName),
    withPageActions('Home', props => (
        <PrimaryButton onClick={() => props.showModal(modalName)}>
            Add Client
        </PrimaryButton>
    ))
)(props => ( <Home {...props} />))