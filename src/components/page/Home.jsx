import React from 'react';

import {BasicPage} from './BasicPage'
import {ClientConsumer} from '../providers/Client'
import {ClientCard} from '../molecule/ClientCard'
import {Button, Col, Row} from 'antd'
import {Link} from 'react-router-dom'
import {AddClientModal} from '../organism/AddClientModal'
import {withBreadcrumb} from '../hoc/withPageBreadcrumb'
import {withModals} from '../hoc/withModals'
import {compose} from '../../lib/compose'

const modalName = 'client';

const HomeClass = ({ showModal, hideModal, isModalOpen }) => (
    <BasicPage title={'Home'} actionButtons={() => (
        <Button htmlType={'button'} type={'primary'} onClick={() => showModal(modalName)}>
            Add Client
        </Button>
    )}>
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
        <AddClientModal visible={isModalOpen(modalName)} onClose={() => hideModal(modalName)}/>
    </BasicPage>
);

HomeClass.propTypes = {};
HomeClass.defaultProps = {};


export const Home = compose(
    withBreadcrumb('home', 'Home'),
    withModals(modalName)
)(HomeClass);