import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'antd'

export const GridList = ({...props}) => <List
    grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xxl: 6,
    }}
    {...props}
/>;

GridList.propTypes = List.propTypes;
GridList.defaultProps = List.defaultProps;

GridList.Item = List.Item;