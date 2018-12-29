import React from 'react';
import {withRouter} from 'react-router-dom'
import {SprintConsumer} from '../../providers/Sprint'
import {SprintCard} from '../../molecule/SprintCard'
import {TaskListCard} from '../../organism/TaskListCard'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {BasePageConsumer} from '../../providers/BasePage'

class SprintPageClass extends React.Component {
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
const SprintPage = withBreadcrumb('sprint', 'Sprint')(SprintPageClass);

export const Sprint = withRouter(({match}) => (
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
));

Sprint.propTypes = {};
Sprint.defaultProps = {};

export default Sprint;