import React from 'react';
import {Button, Card, Col, Icon, Input, Row, Switch, Tabs} from 'antd'
import {TaskConsumer} from '../providers/Task'
import {uploadTask} from '../../lib/api'
import debounce from 'lodash/debounce';
import {AddTaskModal} from './AddTaskModal'
import SprintStatusEnum from '../../lib/SprintStatusEnum'

const check = <Icon type='check' />;
const close = <Icon type='close' />;

const onTaskChange = debounce((task, key, value) => uploadTask({
    ...task,
    [key]: value,
}), 250);

const completedTasks = tasks => tasks.filter(task => task.completed);
const uncompletedTasks = tasks => tasks.filter(task => !task.completed);

const noUncompletedMessage = completedTasks =>
    completedTasks.length > 0
        ? 'Well done all tasks are completed'
        : 'Add some tasks first, before you work on them';

const TaskList = ({ tasks, emptyMessage }) => tasks.length === 0 ? emptyMessage : (
    <Row gutter={16}>{tasks.map(task => (
        <Col key={task.id} span={8}>
            <Input
                addonBefore={<Switch
                    checkedChildren={check}
                    unCheckedChildren={close}
                    onChange={checked => onTaskChange(task, 'completed', checked)}
                    defaultChecked={task.completed}
                />}
                defaultValue={task.name}
                onChange={e => onTaskChange(task, 'name', e.target.value)}
            />
        </Col>
    ))}</Row>
);

const getAddTaskButton = (sprint, showAddTaskModal) => {
    if([SprintStatusEnum.FINISHED, SprintStatusEnum.FINALIZING, SprintStatusEnum.IN_REVIEW].includes(sprint.status)) return null;
    return (
        <Button htmlType={'button'} onClick={showAddTaskModal}>
            <Icon type={'plus'} />Add task
        </Button>
    );
}

export class TaskListCard extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            addTaskModalVisible: false,
        };

        this.showAddTaskModal = this.showAddTaskModal.bind(this);
    }

    showAddTaskModal(){
        this.setState({ addTaskModalVisible: true });
    }

    render(){
        return (
            <Card title={"Tasks"} extra={getAddTaskButton(this.props.sprint, this.showAddTaskModal)}>
                <TaskConsumer sprintIds={[this.props.sprint.id]}>
                    {(tasks) => {
                        const uncompleted = uncompletedTasks(tasks);
                        const completed = completedTasks(tasks);
                        return (
                            <Tabs defaultActiveKey="uncompleted">
                                <Tabs.TabPane tab={<span>{close} Uncompleted ({uncompleted.length})</span>} key="uncompleted">
                                    <TaskList tasks={uncompleted} emptyMessage={noUncompletedMessage(completed)} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab={<span>{check}Completed ({completed.length})</span>} key="completed">
                                    <TaskList tasks={completed} emptyMessage={'Nothing to see here, go complete some tasks first'} />
                                </Tabs.TabPane>
                            </Tabs>
                        )
                    }}
                </TaskConsumer>
                <AddTaskModal
                    visible={this.state.addTaskModalVisible}
                    onClose={() => this.setState({ addTaskModalVisible: false })}
                    sprint={this.props.sprint}/>
            </Card>
        );
    }
}

TaskListCard.propTypes = {};
TaskListCard.defaultProps = {};