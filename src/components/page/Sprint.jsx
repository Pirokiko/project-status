import React from 'react';

import {BasicPage} from './BasicPage'
import {withRouter} from 'react-router-dom'
import {SprintConsumer} from '../providers/Sprint'
import {SprintCard} from '../molecule/SprintCard'
import {TaskListCard} from '../organism/TaskListCard'
import {withBreadcrumb} from '../hoc/withPageBreadcrumb'

const SprintPageClass = ({ sprint }) => (
    <BasicPage title={'Sprint: '+sprint.name}>
        <SprintCard sprint={sprint}/>
        <br/>
        <TaskListCard sprint={sprint} />
    </BasicPage>
);

const SprintPage = withBreadcrumb('sprint', 'Sprint')(SprintPageClass);

export const Sprint = withRouter(({match}) => (
    <SprintConsumer id={match.params.id}>
        {(sprint) => sprint ? <SprintPage sprint={sprint} /> : null}
    </SprintConsumer>
));

Sprint.propTypes = {};
Sprint.defaultProps = {};