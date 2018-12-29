import React from 'react';
import {withRouter} from 'react-router-dom'
import {SprintConsumer, SprintProviderLoader} from '../../providers/Sprint'
import {SprintCard} from '../../molecule/SprintCard'
import {TaskListCard} from '../../organism/TaskListCard'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {BasePageConsumer} from '../../providers/BasePage'
import {compose} from '../../../lib/compose'
import {withLoader} from '../../hoc/withLoader'
import {TaskProviderLoader} from '../../providers/Task'

class SprintPage extends React.Component {
    componentDidMount(){
        this.props.setTitle(`Sprint: ${this.props.sprint.name}`);
        this.props.setActionButtons(() => null);
    }
    componentWillUnmount() {
        this.props.setTitle('');
        this.props.setActionButtons(() => null);
    }

    render(){
        return(
            <React.Fragment>
                <SprintCard sprint={this.props.sprint}/>
                <br/>
                <TaskListCard sprint={this.props.sprint} />
            </React.Fragment>
        );
    }
}

export const Sprint = compose(
    withBreadcrumb('sprint', 'Sprint'),
    withLoader(SprintProviderLoader),
    withLoader(TaskProviderLoader)
)(withRouter(({match}) => (
    <BasePageConsumer>
        {({ setTitle, setActionButtons }) => (
            <SprintConsumer id={match.params.id}>
                {(sprint) => sprint ? <SprintPage
                    sprint={sprint}
                    setTitle={setTitle}
                    setActionButtons={setActionButtons}
                /> : null}
            </SprintConsumer>
        )}
    </BasePageConsumer>
)));

Sprint.propTypes = {};
Sprint.defaultProps = {};

export default Sprint;