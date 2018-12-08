import React from 'react';

import {BasicPage} from './BasicPage'
import {ClientConsumer} from '../providers/Client'
import {ClientCard} from '../molecule/ClientCard'
import {Button} from 'antd'

export const Home = () => (
    <BasicPage title={'Home'} actionButtons={() => (
        <Button type={'primary'} onClick={() => alert('show modal to add project')}>
            Add Project
        </Button>
    )}>
        <ClientConsumer>
            {(clients) => clients.map(client => (
                <ClientCard client={client} style={{maxWidth: '300px'}} />
            ))}
        </ClientConsumer>
    </BasicPage>
);

Home.propTypes = {};
Home.defaultProps = {};