export function getErrorMessage(err) {
    const error = err.errors
        ? Object.values(err.errors)[0].message
        : err.message;
    return error;
}
