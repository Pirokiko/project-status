import React from 'react';

import {BreadcrumbConsumer} from '../providers/Breadcrumb'

export const Breadcrumb = () => (
    <BreadcrumbConsumer>
        {({ keys, breadcrumbs }) => (
            <div>{keys.map(key => breadcrumbs[key] || <span key={key} style={{ margin: 5 }}>{key}</span>)}</div>
        )}
    </BreadcrumbConsumer>
);

Breadcrumb.propTypes = {};
Breadcrumb.defaultProps = {};