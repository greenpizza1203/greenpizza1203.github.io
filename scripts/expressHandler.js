const express= require('express');
function init() {
    var app = express();

    app.get('/', function (req, res) {
        res.send("Hi")
    });

    app.get('/:id/', handle);
    app.get('/:id/*', handle);

    app.listen(3000);
    console.log("Listening on: " + 3000);

}

async function handle(req, res) {

    console.log(req.path);
    let params = req.params;
    if (isNaN(params["id"])) {
        res.status(420).end();
        return
    }
    if (!('0' in params)) {
        params['0'] = 'index.html'
    }
    if (params['0'] === 'reset') {
        resetFiles(params.id);
        res.send('Done');
        return;
    }
    let path = await getOrSave(params);

    res.sendFile(path, {root: process.cwd()});
}

module.exports = {init};