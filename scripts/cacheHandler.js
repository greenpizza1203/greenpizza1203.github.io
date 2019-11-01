const fse = require('fs-extra');
const request = require('request');
const config = require('./config.json');
const base_url = config.base_url;
const path = require('path');
const javascriptHandler = require('./javascriptHandler');


async function getOrSave(params) {
    const file = `store/${params.id}/${params[0]}`;

    if (!fse.existsSync(file)) {
        await save(params, file)
    }
    return file;
}

async function save(params, file) {

    let urlToGet = `${base_url}${params.id}/${params['0']}`;
    const buffer = request.get(urlToGet).on('response', function (response) {
        if (response.statusCode !== 200) {
            console.error("cant get: " + urlToGet);
        }
    });
    // console.log(buffer);
    fse.mkdirsSync(path.dirname(file));
    let local = `store/${params.id}/${params['0']}`;
    await new Promise(resolve => {
        buffer.pipe(fse.createWriteStream(local)).on('finish', function () {
            javascriptHandler.checkDomain(local);
            resolve()
        });
    });
}

function resetFiles(id) {
    fse.removeSync(`store/${id}`)
}

function clearCache() {

    fse.removeSync('store')
}

module.exports = {getOrSave, resetFiles, clearCache};
