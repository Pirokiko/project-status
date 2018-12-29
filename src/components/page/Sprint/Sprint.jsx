import React from 'react';
import {withRouter} from 'react-router-dom'
import {SprintConsumer, SprintProviderLoader} from '../../providers/Sprint'
import {SprintCard} from '../../molecule/SprintCard'
import {TaskListCard} from '../../organism/TaskListCard'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {compose} from '../../../lib/compose'
import {withLoader} from '../../hoc/withLoader'
import {TaskProviderLoader} from '../../providers/Task'
import {withPageActions} from '../../hoc/withPageActions'

const SprintPage = ({ sprint }) => (
    <React.Fragment>
        <SprintCard sprint={sprint}/>
        <br/>
        <TaskListCard sprint={sprint} />
    </React.Fragment>
);

export const Sprint = compose(
    withBreadcrumb('sprint', 'Sprint'),
    withLoader(SprintProviderLoader),
    withLoader(TaskProviderLoader),
    withPageActions(({ sprint}) => `Sprint: ${sprint && sprint.name}`)
)(withRouter(({match}) => (
    <SprintConsumer id={match.params.id}>
        {(sprint) => sprint ? <SprintPage sprint={sprint} /> : null}
    </SprintConsumer>
)));

Sprint.propTypes = {};
Sprint.defaultProps = {};