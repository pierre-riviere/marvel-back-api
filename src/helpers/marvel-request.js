const md5 = require('md5');
const { request } = require('./request');

module.exports = {
    getCharacters,
};

/**
 * Marvel request Helper
 *
 * @param {RequestConfig} config - request configs
 * @returns {Promise<object>}
 */
async function marvelRequest(config) {
    config.params = {
        ...(config.params || {}),
        ts: Date.now(),
        apikey: process.env.MARVEL_PUBLIC_KEY,
    };
    config.params.hash = md5(`${config.params.ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`);
    config.url = `${process.env.MARVEL_API_URL}${config.url}`;

    return request(config);
}

/**
 * Get Marvel characters
 *
 * @param {MarvelFilter} filter - filter to apply
 * @returns {Promise<object>}
 */
async function getCharacters(filter) {
    const response = await marvelRequest({
        method: 'get',
        url: `/characters`,
        params: filter,
    });
    return response.data;
}
