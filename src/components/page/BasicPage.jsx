import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd'

const {
    Header, Footer, Content,
} = Layout;

export const BasicPage = ({title, actionButtons, children}) => (
    <Layout style={{minHeight:'100%'}}>
        <Header style={{color: 'white'}}>
            <span>{title}</span>
            <span style={{float: 'right'}}>{actionButtons}</span>
        </Header>
        <Content style={{padding: '1em'}} element={'main'}><main>{children}</main></Content>
        <Footer>&copy; Milan de Graaf 2018</Footer>
    </Layout>
);

BasicPage.propTypes = {
    title: PropTypes.string.isRequired,
    actionButtons: PropTypes.node,
};
BasicPage.defaultProps = {
    actionButtons: () => null,
};