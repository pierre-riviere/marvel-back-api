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
    // option.headers = {
    //     Authorization: 'Bearer ' + process.env.APIKEY,
    // };

    const ts = Date.now();
    const apikey = process.env.MARVEL_PUBLIC_KEY;
    const hash = md5(`${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`);

    option.url = process.env.MARVEL_API_URL + option.url + `ts=${ts}&apikey=${apikey}&hash=${hash}`;

    const response = await axios.request(option).catch((error) => {
        throw new Error('[ERROR] - Marvel api failed', error);
    });
    return response;
}

/**
 * Get characters
 */
async function getCharacters(data) {
    const response = await request({
        method: 'get',
        url: `/characters?`,
    });
    return response.data;
}
