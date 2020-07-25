const api = require('./api');
const pkg = require('../package.json');

module.exports = function plugRoutes(app) {
    app.get('/', (req, res) => {
        res.json({
            version: pkg.version,
            name: pkg.description,
        });
    });
    app.use('/api', api);
};
