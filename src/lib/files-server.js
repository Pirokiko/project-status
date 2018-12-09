const BASE_FILE_URL = 'http://localhost:8000';

export const getFileUrl = uuid => `${BASE_FILE_URL}/${uuid}`;
export const getFileUploadUrl = () => `${BASE_FILE_URL}/upload`;

