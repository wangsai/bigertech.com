var admin       = require('../controllers/admin'),
    express     = require('express'),

    adminRoutes;

adminRoutes = function () {
    var router = express.Router();



    router.get('/positions/', admin.positions);

    router.get('/positionsJson/', admin.positionsJson);

    router.post('/positions/add/', admin.positionsAdd);

    router.get('/positions/delete/:id/', admin.positionsDelete);

    router.post('/positions/update/', admin.positionsUpdate);

    router.get('/position/:id/', admin.position);

    router.get('/positionJson/:id/', admin.positionJson);

    router.post('/position/add/', admin.positionAdd);

    router.post('/position/update/', admin.positionUpdate);

    router.get('/position/delete/:id/', admin.positionDelete);

    router.get('*', admin.index);

    return router;
};

module.exports = adminRoutes;
