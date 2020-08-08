const axios = require('axios');
require('./typedef');

module.exports = {
    request,
};

/**
 * Request helper
 *
 * @param {RequestConfig} config - request configs
 * @returns {Promise<object>}
 */
async function request(config) {
    const response = await axios.request(config).catch((error) => {
        const message = error.response && error.response.data ? JSON.stringify(error.response.data) : null;
        throw new Error(`[ERROR] - ${config.url} api failed : ${message}`);
    });

    return response;
}
