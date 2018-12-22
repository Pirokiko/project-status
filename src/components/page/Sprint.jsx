import React from 'react';
import {Button} from 'antd'
import { Col, Row } from 'antd';

import {BasicPage} from './BasicPage'
import {ProjectConsumer} from '../providers/Project'
import {withRouter} from 'react-router-dom'
import {ProjectCard} from '../molecule/ProjectCard'
import {SprintConsumer} from '../providers/Sprint'
import {SprintCard} from '../molecule/SprintCard'
import {AddSprintModal} from '../organism/AddSprintModal'
import {TaskConsumer} from '../providers/Task'
import {TaskListCard} from '../organism/TaskListCard'

class SprintPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addSprintModal: false,
        }
    }

    render(){
        const { sprint } = this.props;
        return (
            <BasicPage title={'Sprint: '+sprint.name}>
                <SprintCard sprint={sprint}/>
                <br/>
                <TaskListCard sprint={sprint} />
            </BasicPage>
        );
    }
}

export const Sprint = withRouter(({match}) => (
    <SprintConsumer id={match.params.id}>
        {(sprint) => sprint ? <SprintPage sprint={sprint} /> : null}
    </SprintConsumer>
));

Sprint.propTypes = {};
Sprint.defaultProps = {};