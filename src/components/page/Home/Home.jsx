import React from 'react';
import {Button, Col, Row} from 'antd'
import {Link} from 'react-router-dom'
import {ClientConsumer, ClientProviderLoader} from '../../providers/Client'
import {ClientCard} from '../../molecule/ClientCard'
import {AddClientModal} from '../../organism/AddClientModal'
import {BasePageConsumer} from '../../providers/BasePage'
import {compose} from '../../../lib/compose'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {withModals} from '../../hoc/withModals'
import {withLoader} from '../../hoc/withLoader'

const modalName = 'client';

class Home extends React.Component {
    componentDidMount(){
        this.props.setTitle('Home');
        this.props.setActionButtons(() => (
            <Button htmlType={'button'} type={'primary'} onClick={() => this.props.showModal(modalName)}>
                Add Client
            </Button>
        ));
    }
    componentWillUnmount() {
        this.props.setTitle('');
        this.props.setActionButtons(() => null);
    }

    render(){
        const { isModalOpen, hideModal } = this.props;
        return (
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
    }
}

export const HomePage = compose(
    withLoader(ClientProviderLoader),
    withBreadcrumb('home', 'Home'),
    withModals(modalName),
)(props => (
    <BasePageConsumer>
        {({ setTitle, setActionButtons }) => (
            <Home {...props} setTitle={setTitle} setActionButtons={setActionButtons} />
        )}
    </BasePageConsumer>
))