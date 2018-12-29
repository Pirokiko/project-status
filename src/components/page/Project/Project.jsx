import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Button, Col, Row} from 'antd';
import {ProjectConsumer, ProjectProviderLoader} from '../../providers/Project'
import {ProjectCard} from '../../molecule/ProjectCard'
import {SprintConsumer, SprintProviderLoader} from '../../providers/Sprint'
import {SprintCard} from '../../molecule/SprintCard'
import {AddSprintModal} from '../../organism/AddSprintModal'
import {BasePageConsumer} from '../../providers/BasePage'
import {compose} from '../../../lib/compose'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {withModals} from '../../hoc/withModals'

const modalName = 'sprint';

class ProjectPageClass extends React.Component{
    componentDidMount(){
        this.props.setTitle(`Project: ${this.props.project.name}`);
        this.props.setActionButtons(() => (
            <Button htmlType={'button'} type={'primary'} onClick={() => this.props.showModal(modalName)}>
                Add Sprint
            </Button>
        ));
    }
    componentWillUnmount() {
        this.props.setTitle('');
        this.props.setActionButtons(() => null);
    }

    render(){
        const { project, isModalOpen, hideModal } = this.props;
        return (
            <React.Fragment>
                <ProjectCard project={project}/>
                <br/>
                <h1>Sprints</h1>
                <Row gutter={16}>
                    <SprintConsumer projectIds={[project.id]}>
                        {(sprints) => sprints.map(sprint => (
                            <Col key={sprint.id} span={8}>
                                <Link to={'/sprint/' + sprint.id}>
                                    <SprintCard sprint={sprint} style={{marginBottom: 16}} />
                                </Link>
                            </Col>
                        ))}
                    </SprintConsumer>
                </Row>
                <AddSprintModal
                    project={project}
                    visible={isModalOpen(modalName)}
                    onClose={() => hideModal(modalName)}
                />
            </React.Fragment>
        );
    }
}

const ProjectPage = compose(
    withBreadcrumb('project', 'Project'),
    withModals(modalName),
)(ProjectPageClass);

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