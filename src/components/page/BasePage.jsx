import React from 'react';
import {BasicPage} from './BasicPage'
import {BasePageConsumer, BasePageProvider} from '../providers/BasePage'

export const BasePage = ({...props}) => (
    <BasePageProvider>
        <BasePageConsumer>
            {({title, actionButtons}) => (
                <BasicPage {...props} title={title} actionButtons={actionButtons} />
            )}
        </BasePageConsumer>
    </BasePageProvider>
);

BasePage.propTypes = {};
BasePage.defaultProps = {};