import React from 'react';
import {Button, Col, Row} from 'antd'
import {Link} from 'react-router-dom'
import {ClientConsumer, ClientProviderLoader} from '../../providers/Client'
import {ClientCard} from '../../molecule/ClientCard'
import {AddClientModal} from '../../organism/AddClientModal'
import {BasePageConsumer} from '../../providers/BasePage'

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addClientModal: false,
        }
    }

    componentDidMount(){
        this.props.setTitle('Home');
        this.props.setActionButtons(() => (
            <Button type={'primary'} onClick={() => this.setState({
                    addClientModal: true,
            })}>
                Add Client
            </Button>
        ));

        this.props.loadClients();
    }
    componentWillUnmount() {
        this.props.setTitle('');
        this.props.setActionButtons(() => null);
    }

    render(){
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
                <AddClientModal visible={this.state.addClientModal} onClose={() => this.setState({
                    addClientModal: false,
                })}/>
            </React.Fragment>
        );
    }
}
Home.propTypes = {};
Home.defaultProps = {};

const HomeWrapper = props => (
    <ClientProviderLoader>
        {(loadClients) => (
            <BasePageConsumer>
                {({ setTitle, setActionButtons }) => (
                    <Home {...props} setTitle={setTitle} setActionButtons={setActionButtons} loadClients={loadClients} />
                )}
            </BasePageConsumer>
        )}
    </ClientProviderLoader>
)

export default HomeWrapper;