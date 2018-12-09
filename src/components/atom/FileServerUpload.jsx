import React from 'react';
import PropTypes from 'prop-types';
import {getFileUploadUrl} from '../../lib/files-server'
import {message, Upload} from 'antd'

const props = (name, onFileUploaded, onError) => ({
    name,
    action: getFileUploadUrl(),
    headers: {
        authorization: 'authorization-text',
        accept: 'application/json; charset=utf-8',
    },
    onChange(info) {
        const file = info.file;
        if (file.status === 'error') {
            onError(['Upload failed'], info[name]);
        }
        if (file.status === 'done') {
            const response = file.response;
            const errors = response['errors'];
            if(errors.length === 0){
                onFileUploaded(response.data, info[name]);
                message.success(`${info.file.name} file uploaded successfully`);
            }else{
                onError(errors, info[name]);
            }
        }

    },
});


export const FileServerUpload = ({ name, onFileUploaded, onError, ...ownProps }) => {
    if(ownProps.onChange){
        console.warn(
            'Do not use the onChange listener on the FileServerUpload, it will be ignored.' +
            'This component is intended to work with a file-server project.' +
            'If you wish to do custom uploads use Upload component directly'
        );
    }
    return <Upload {...ownProps} {...props(name, onFileUploaded, onError)} showUploadList={false} />;
}

FileServerUpload.propTypes = {
    onFileUploaded: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    name: PropTypes.string,
};
FileServerUpload.defaultProps = {
    name: 'file',
};