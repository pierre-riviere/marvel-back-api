const router = require('express').Router();
const resUtils = require('../../helpers/response');
const charactersCtrl = require('../../controllers/characters');

/**
 * @api {get} /api/characters
 * @apiDescription return characters
 * @apiVersion 0.0.1
 *
 * @apiGroup contracts
 * @apiQuery {number} offset
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "success": true,
 *          "code": 200,
 *          "data": [
 *              ...
 *          ]
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false,
 *       "code": 404
 *       "message": "Not found"
 *     }
 */
router.get('/list', async (req, res) => {
    charactersCtrl.getCharacters().then(resUtils.send(res)).catch(resUtils.sendError(res));
});

module.exports = router;
