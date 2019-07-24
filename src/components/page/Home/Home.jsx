import React from 'react';
import {Col, List, Row} from 'antd'
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
import {GridList} from '../../atom/GridList'

const modalName = 'client';

const Home = ({ isModalOpen, hideModal }) => (
    <React.Fragment>
        <ClientConsumer>
            {(clients) => (
                <GridList
                    dataSource={clients}
                    renderItem={client => <List.Item>
                        <Link to={'/client/'+client.id}>
                            <ClientCard client={client} />
                        </Link>
                    </List.Item>}
                />
            )}
        </ClientConsumer>
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