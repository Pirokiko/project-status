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

const StatusMenu = ({values, status, onChange}) => (
    <Menu>
        {values.map(value => (
            <Menu.Item key={value}
                       disabled={!isAllowed(status, getSurroundingValues(value, values))}
                       onClick={changeTo(onChange, value)}
            >
                {value}
            </Menu.Item>
        ))}
    </Menu>
);

export const StatusTag = ({status, values, onChange, noChange}) => {
    const tag = <Tag color={colorForStatus(status)}>{status}</Tag>;
    if(noChange){
        return tag;
    }
    return (
        <Dropdown overlay={
            <StatusMenu status={status} values={values} onChange={onChange}/>
        }>
            {tag}
        </Dropdown>
    );
}
StatusTag.propTypes = {
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    status: PropTypes.string,
    noChange: PropTypes.bool,
};
StatusTag.defaultProps = {
    onChange: () => {},
    noChange: false,
};