import React from 'react';
import {BasicPage} from './BasicPage'
import {Button, Col, Row} from 'antd'
import {ClientConsumer} from '../providers/Client'
import {Link, withRouter} from 'react-router-dom'
import {ClientCard} from '../molecule/ClientCard'
import {ProjectConsumer} from '../providers/Project'
import {ProjectCard} from '../molecule/ProjectCard'
import {AddProjectModal} from '../organism/AddProjectModal'

class ClientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addProjectModal: false,
        }
    }

    render() {
        return (
            <ClientConsumer id={this.props.id}>
                {(client) => {
                    if (!client) return null;
                    return (
                        <React.Fragment>
                            <BasicPage title={client.name} actionButtons={() => (
                                <Button type={'primary'} onClick={() => this.setState({ addProjectModal: true})}>
                                    Add Project
                                </Button>
                            )}>
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
                            </BasicPage>
                            <AddProjectModal
                                client={client}
                                visible={this.state.addProjectModal}
                                onClose={() => this.setState({
                                    addProjectModal: false,
                                })}
                            />
                        </React.Fragment>
                    );
                }}
            </ClientConsumer>
        );
    }
}

export const Client = withRouter(({match}) => <ClientPage id={match.params.id}/>)

Client.propTypes = {};
Client.defaultProps = {};