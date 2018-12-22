import React from 'react';
import {Button, Card, Col, Icon, Input, Row, Switch, Tabs} from 'antd'
import {TaskConsumer} from '../providers/Task'
import {uploadTask} from '../../lib/api'
import debounce from 'lodash/debounce';
import {AddTaskModal} from './AddTaskModal'

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

const TaskList = ({ tasks, emptyMessage }) => {
    if(tasks.length === 0) return emptyMessage;

    return (
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
}

export class TaskListCard extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            addTaskModalVisible: false,
        };
    }
    render(){
        return (
            <Card title={"Tasks"} extra={<Button htmlType={'button'} onClick={() => this.setState({
                addTaskModalVisible: true
            })}><Icon type={'plus'} />Add task</Button>}>
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