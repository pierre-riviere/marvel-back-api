const axios = require('axios');
const md5 = require('md5');

module.exports = {
    getCharacters,
};

/**
 * Request helper
 *
 * @param {object} option - request options
 * @param {string} option.url - api url to request
 * @param {string} option.method - request method (post, patch, delete, ...)
 * @param {object?} option.data - data to send
 * @returns {Promise<object>}
 */
async function request(option) {
    const ts = Date.now();
    const apikey = process.env.MARVEL_PUBLIC_KEY;
    const hash = md5(`${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`);

    option.url = process.env.MARVEL_API_URL + option.url + `&ts=${ts}&apikey=${apikey}&hash=${hash}`;

    const response = await axios.request(option).catch((error) => {
        const message = error.response && error.response.data ? JSON.stringify(error.response.data) : null;
        throw new Error(`[ERROR] - Marvel api failed : ${message}`);
    });

    return response;
}

/**
 * Get characters
 *
 * @param {object} filter
 * @param {number|string} limit
 * @param {number|string} offset
 * @returns {Promise<object>}
 */
async function getCharacters(filter) {
    let params = '';

    if (typeof filter === 'object') {
        params = Object.keys(filter)
            .reduce((memo, param) => {
                if (!filter[param]) {
                    return memo;
                }
                memo.push(`${param}=${filter[param]}`);
                return memo;
            }, [])
            .join('&');
    }

    const response = await request({
        method: 'get',
        url: `/characters?${params}`,
    });
    return response.data;
}
