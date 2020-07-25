const mRequest = require('../../helpers/marvel-request');

class CharactersController {
    async getCharacters() {
        return await mRequest.getCharacters();
    }
}

module.exports = new CharactersController();
