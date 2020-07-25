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
        return await mRequest.getCharacters(filter);
    }
}

module.exports = new CharactersController();
