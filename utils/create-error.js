exports.createError = async (message, status) => {
    let error = new Error();
    error.message = message;
    error.status = status;
    return error;
}