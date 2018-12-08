import React from 'react';

import {BasicPage} from './BasicPage'
import {ClientConsumer} from '../providers/Client'
import {ClientCard} from '../molecule/ClientCard'
import {Button} from 'antd'
import {Link} from 'react-router-dom'

export const Home = () => (
    <BasicPage title={'Home'} actionButtons={() => (
        <Button type={'primary'} onClick={() => alert('show modal to add client')}>
            Add Client
        </Button>
    )}>
        <ClientConsumer>
            {(clients) => clients.map(client => (
                <Link to={'/client/'+client.id}>
                    <ClientCard client={client} style={{maxWidth: '300px'}}/>
                </Link>
            ))}
        </ClientConsumer>
    </BasicPage>
);

Home.propTypes = {};
Home.defaultProps = {};