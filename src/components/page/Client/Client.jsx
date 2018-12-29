import React from 'react';
import {Button, Col, Row} from 'antd'
import {ClientConsumer, ClientProviderLoader} from '../../providers/Client'
import {Link, withRouter} from 'react-router-dom'
import {ClientCard} from '../../molecule/ClientCard'
import {ProjectConsumer, ProjectProviderLoader} from '../../providers/Project'
import {ProjectCard} from '../../molecule/ProjectCard'
import {AddProjectModal} from '../../organism/AddProjectModal'
import {BasePageConsumer} from '../../providers/BasePage'
import {withModals} from '../../hoc/withModals'
import {compose} from '../../../lib/compose'
import {withBreadcrumb} from '../../hoc/withPageBreadcrumb'
import {withLoader} from '../../hoc/withLoader'

const modalName = 'client';

class ClientPageClass extends React.Component {
    componentDidMount(){
        this.props.setTitle(`Client: ${this.props.client.name}`);
        this.props.setActionButtons(() => (
            <Button htmlType={'button'} type={'primary'} onClick={() => this.props.showModal(modalName)}>
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
                    visible={this.props.isModalOpen(modalName)}
                    onClose={() => this.props.hideModal(modalName)}
                />
            </React.Fragment>
        );
    }
}

const ClientPageWithModal = compose(
    withBreadcrumb('client', 'Client'),
    withModals(modalName)
)(ClientPageClass);

const OnlyWithClient = ({ id, ...props }) => (
    <ClientConsumer id={id}>
        {(client) => {
            if(!client) return null;

            return <ClientPageWithModal {...props} client={client} />
        }}
    </ClientConsumer>
);

const Client = withRouter(({history, location, match, ...props}) => <OnlyWithClient {...props} id={match.params.id}/>)
Client.propTypes = {};
Client.defaultProps = {};

export const ClientPage = compose(
    withLoader(ProjectProviderLoader),
    withLoader(ClientProviderLoader),
)(props => (
    <BasePageConsumer>
        {({ setTitle, setActionButtons }) => (
            <Client {...props}
                    setTitle={setTitle}
                    setActionButtons={setActionButtons}
            />
        )}
    </BasePageConsumer>
))