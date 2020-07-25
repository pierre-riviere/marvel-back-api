const mRequest = require('../../helpers/marvel-request');

class CharactersController {
    /**
     * Get characters
     * with pagination
     *
     * @param {object} filter
     * @returns {Promise<object>}
     */
    async getCharacters(filter) {
        const res = await mRequest.getCharacters(filter);
        const resData = res.data || {};
        const { offset, limit, total, count } = resData;
        return {
            offset,
            limit,
            total,
            count,
            characters: resData.results,
        };
    }
}

module.exports = new CharactersController();
