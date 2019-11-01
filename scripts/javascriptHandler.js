const replace = require('replace-in-file');

function checkDomain(filePath) {
    if (!filePath.endsWith('.js')) {
        return
    }
    replace.sync({
        files: filePath,
        from: /coolmathgames/g,
        to: 'herokuapp',
    });

}

module.exports = {checkDomain};