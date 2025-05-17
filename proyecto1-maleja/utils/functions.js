function throwCustomError(code, msg) {
    throw new Error(JSON.stringify({ code, msg }));
}

function respondWithError(res, e) {
    try {
        const err = JSON.parse(e.message);
        const statusCode = typeof err.code === 'number' && err.code >= 100 && err.code <= 599 ? err.code : 500;

        res.status(statusCode).json({
            mensaje: "Fallido",
            err: err.msg,
        });
    } catch (parseError) {
        // Default error response if parsing fails
        res.status(500).json({
            mensaje: "Fallido",
            err: "Error Interno del Servidor",
        });
    }
}

module.exports = {
    throwCustomError,
    respondWithError
};
