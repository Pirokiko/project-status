import React from 'react';
import PropTypes from 'prop-types';

import {Dropdown, Tag, Menu} from 'antd'
import {colorForStatus} from '../../lib/colors'

const changeTo = (onChange, status) => () => onChange(status);

const isAllowed = (status, allowedList) => {
    return !!allowedList.find(listItem => listItem === status);
}

const getSurroundingValues = (status, statusList) => {
    const idx = statusList.indexOf(status);
    if (idx === -1) return [];
    if (idx === 0) return [statusList[1]];
    if (idx === statusList.length - 1) return [statusList[statusList.length - 2]];
    return [statusList[idx - 1], statusList[idx + 1]];
};

const StatusMenu = ({entity, values, statusKey, onChange}) => (
    <Menu>
        {values.map(value => (
            <Menu.Item key={entity.id + value}
                       disabled={!isAllowed(entity[statusKey], getSurroundingValues(value, values))}
                       onClick={changeTo(onChange, value)}
            >
                {value}
            </Menu.Item>
        ))}
    </Menu>
);

export const EntityStatusTag = ({entity, statusKey, values, onChange}) => (
    <Dropdown overlay={
        <StatusMenu entity={entity} statusKey={statusKey} values={values} onChange={onChange}/>
    }>
        <Tag color={colorForStatus(entity.status)}>{entity.status}</Tag>
    </Dropdown>
);
EntityStatusTag.propTypes = {
    entity: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    values: PropTypes.array.isRequired,
    statusKey: PropTypes.string,
};
EntityStatusTag.defaultProps = {
    statusKey: 'status',
};