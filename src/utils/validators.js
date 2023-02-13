const ALLOWED_FILE_TYPES = ['application/json', 'text/csv', 'application/jsonl']

export const dataSetValidator = (file) => {
    if (file && !ALLOWED_FILE_TYPES.includes(file.type)) {
        return false;
    }
    return true;
}