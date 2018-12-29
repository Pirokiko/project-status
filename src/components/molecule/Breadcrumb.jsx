import React from 'react';

import {BreadcrumbConsumer} from '../providers/Breadcrumb'

export const Breadcrumb = () => (
    <BreadcrumbConsumer>
        {({ keys, breadcrumbs }) => {
            console.log(keys);
            return (
                <div>{
                    keys.map(key => breadcrumbs[key])
                }</div>
            );
        }}
    </BreadcrumbConsumer>
);

Breadcrumb.propTypes = {};
Breadcrumb.defaultProps = {};