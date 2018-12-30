import React from 'react';
import {withRouter} from 'react-router-dom'
import {SprintProviderLoader} from '../../providers/Sprint'
import {SprintCard} from '../../molecule/SprintCard'
import {TaskListCard} from '../../organism/TaskListCard'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {compose} from '../../../lib/compose'
import {withLoader} from '../../hoc/withLoader'
import {TaskProviderLoader} from '../../providers/Task'
import {withPageActions} from '../../hoc/withPageActions'
import {withSprint} from '../../hoc/withSprint'

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
    withRouter,
    withSprint(({ match }) => match.params.id, true),
    withPageActions(({ sprint }) => `Sprint: ${sprint.name}`),
)(SprintPage);

Sprint.propTypes = {};
Sprint.defaultProps = {};