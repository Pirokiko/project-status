import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Col, Row} from 'antd';
import {ProjectConsumer, ProjectProviderLoader} from '../../providers/Project'
import {ProjectCard} from '../../molecule/ProjectCard'
import {SprintConsumer, SprintProviderLoader} from '../../providers/Sprint'
import {SprintCard} from '../../molecule/SprintCard'
import {AddSprintModal} from '../../organism/AddSprintModal'
import {BasePageConsumer} from '../../providers/BasePage'

class ProjectPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addSprintModal: false,
        }
    }

    componentDidMount(){
        this.props.setTitle(`Project: ${this.props.project.name}`);
        this.props.setActionButtons(() => (
            <Button type={'primary'} onClick={() => this.setState({ addSprintModal: true})}>
                Add Sprint
            </Button>
        ));
    }
    componentWillUnmount() {
        this.props.setTitle('');
        this.props.setActionButtons(() => null);
    }

    render(){
        const { project } = this.props;
        return (
            <React.Fragment>
                <ProjectCard project={project}/>
                <br/>
                <h1>Sprints</h1>
                <Row gutter={16}>
                    <SprintConsumer projectIds={[project.id]}>
                        {(sprints) => sprints.map(sprint => (
                            <Col key={sprint.id} span={8}>
                                <SprintCard sprint={sprint} style={{marginBottom: 16}} />
                            </Col>
                        ))}
                    </SprintConsumer>
                </Row>
                <AddSprintModal
                    project={project}
                    visible={this.state.addSprintModal}
                    onClose={() => this.setState({
                        addSprintModal: false,
                    })}
                />
            </React.Fragment>
        );
    }
}

class OnlyWithProject extends React.Component {
    componentDidMount() {
        this.props.loadProjects();
        this.props.loadSprints();
    }

    render(){
        const {id, ...props} = this.props;
        return (
            <ProjectConsumer id={id}>
                {(project) => {
                    if(!project) return null;

                    return <ProjectPage {...props} project={project} />
                }}
            </ProjectConsumer>
        )
    }
}

const Project = withRouter(({history, location, match, ...props}) => <OnlyWithProject {...props} id={match.params.id}/>)
Project.propTypes = {};
Project.defaultProps = {};

const ProjectWrapper = props => (
    <ProjectProviderLoader>
        {(loadProjects) => (
            <SprintProviderLoader>
                {(loadSprints) => (
                    <BasePageConsumer>
                        {({ setTitle, setActionButtons }) => (
                            <Project {...props}
                                     setTitle={setTitle}
                                     setActionButtons={setActionButtons}
                                     loadProjects={loadProjects}
                                     loadSprints={loadSprints}
                            />
                        )}
                    </BasePageConsumer>
                )}
            </SprintProviderLoader>
        )}
    </ProjectProviderLoader>
)

export default ProjectWrapper;