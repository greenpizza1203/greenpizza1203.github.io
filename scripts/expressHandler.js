const express = require('express');
const cache = require('./cacheHandler');

function init() {
    var app = express();

    app.get('/', function (req, res) {
        res.send("Hi!")
    });

    app.get('/:id/', handle);
    app.get('/:id/*', handle);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log("Listening on: " + PORT);

}

async function handle(req, res) {

    let params = req.params;
    if (isNaN(params["id"])) {
        res.status(420).end();
        return
    }
    if (!('0' in params)) {
        params['0'] = 'index.html'
    }
    if (params['0'] === 'reset') {
        cache.resetFiles(params.id);
        res.send('Done');
        return;
    }
    let path = await cache.getOrSave(params);

    res.sendFile(path, {root: process.cwd()});
}

module.exports = {init};
