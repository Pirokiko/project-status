import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd'

const {
    Header, Footer, Content,
} = Layout;

export const BasicPage = ({title, actionButtons, children}) => (
    <Layout>
        <Header style={{color: 'white'}}>
            <span>{title}</span>
            <span style={{float: 'right'}}>{actionButtons()}</span></Header>
        <Content style={{padding: '1em'}}>{children}</Content>
        <Footer>&copy; Milan de Graaf 2018</Footer>
    </Layout>
);

BasicPage.propTypes = {
    title: PropTypes.string.isRequired,
    actionButtons: PropTypes.func,
};
BasicPage.defaultProps = {
    actionButtons: () => null,
};