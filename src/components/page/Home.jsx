import React from 'react';

import {BasicPage} from './BasicPage'
import {ClientConsumer} from '../providers/Client'
import {ClientCard} from '../molecule/ClientCard'
import {Button, Col, Row} from 'antd'
import {Link} from 'react-router-dom'
import {AddClientModal} from '../organism/AddClientModal'

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addClientModal: false,
        }
    }

    render(){
        return (
            <BasicPage title={'Home'} actionButtons={() => (
                <Button type={'primary'} onClick={() => this.setState({
                    addClientModal: true,
                })}>
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
                <AddClientModal visible={this.state.addClientModal} onClose={() => this.setState({
                    addClientModal: false,
                })}/>
            </BasicPage>
        );
    }
}

Home.propTypes = {};
Home.defaultProps = {};