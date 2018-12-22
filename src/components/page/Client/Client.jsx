import React from 'react';
import {Button, Col, Row} from 'antd'
import {ClientConsumer, ClientProviderLoader} from '../../providers/Client'
import {Link, withRouter} from 'react-router-dom'
import {ClientCard} from '../../molecule/ClientCard'
import {ProjectConsumer, ProjectProviderLoader} from '../../providers/Project'
import {ProjectCard} from '../../molecule/ProjectCard'
import {AddProjectModal} from '../../organism/AddProjectModal'
import {BasePageConsumer} from '../../providers/BasePage'

class ClientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClientModal: false,
        }
    }
    componentDidMount(){
        this.props.setTitle(`Client: ${this.props.client.name}`);
        this.props.setActionButtons(() => (
            <Button type={'primary'} onClick={() => this.setState({ addClientModal: true})}>
                Add Project
            </Button>
        ));
    }
    componentWillUnmount() {
        this.props.setTitle('');
        this.props.setActionButtons(() => null);
    }

    render() {
        const { client } = this.props;
        return (
            <React.Fragment>
                <ClientCard client={client}/>
                <br/>
                <h1>Projects</h1>
                <Row gutter={16}>
                    <ProjectConsumer clientIds={[client.id]}>
                        {(projects) => projects.map(project => (
                            <Col key={project.id} span={8}>
                                <Link to={'/project/' + project.id}>
                                    <ProjectCard project={project}/>
                                </Link>
                            </Col>
                        ))}
                    </ProjectConsumer>
                </Row>
                <AddProjectModal
                    client={client}
                    visible={this.state.addClientModal}
                    onClose={() => this.setState({
                        addClientModal: false,
                    })}
                />
            </React.Fragment>
        );
    }
}

class OnlyWithClient extends React.Component {
    componentDidMount() {
        this.props.loadClients();
        this.props.loadProjects();
    }

    render() {
        const { id, ...props } = this.props;
        return (
            <ClientConsumer id={id}>
                {(client) => {
                    if(!client) return null;

                    return <ClientPage {...props} client={client} />
                }}
            </ClientConsumer>
        );
    }
}

// const OnlyWithClient = ({id, ...props}) => (
//     <ClientConsumer id={id}>
//         {(client) => {
//             if(!client) return null;
//
//             return <ClientPage {...props} client={client} />
//         }}
//     </ClientConsumer>
// );

const Client = withRouter(({history, location, match, ...props}) => <OnlyWithClient {...props} id={match.params.id}/>)
Client.propTypes = {};
Client.defaultProps = {};

const ClientWrapper = props => (
    <ProjectProviderLoader>
        {(loadProjects) => (
            <ClientProviderLoader>
                {(loadClients) => (
                    <BasePageConsumer>
                        {({ setTitle, setActionButtons }) => (
                            <Client {...props}
                                    setTitle={setTitle}
                                    setActionButtons={setActionButtons}
                                    loadClients={loadClients}
                                    loadProjects={loadProjects}
                            />
                        )}
                    </BasePageConsumer>
                )}
            </ClientProviderLoader>
        )}
    </ProjectProviderLoader>
)

export default ClientWrapper;