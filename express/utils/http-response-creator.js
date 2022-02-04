module.exports = function httpResponse(res, status, json) {
    return res.status(status).json(json);
}