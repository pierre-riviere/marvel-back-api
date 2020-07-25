module.exports = {
    send,
    sendError,
};

function send(res) {
    return (data) => {
        const dataObject = data || {};
        const code = dataObject.code && typeof dataObject.code === 'number' ? dataObject.code : 200;

        res.status(code).json({
            success: true,
            data: dataObject,
            code,
        });
    };
}

function sendError(res) {
    return (data) => {
        const error = data || {};
        const message = error.message || "Une erreur s'est produite.";
        const code = error.code && typeof error.code === 'number' ? error.code : 400;
        const errorCode = error.errorCode || error.stack || '';

        res.status(code).json({
            success: false,
            code,
            message,
            errorCode,
        });
    };
}
