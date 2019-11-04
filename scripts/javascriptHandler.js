const replace = require('replace-in-file');

function checkDomain(filePath) {
    if (!filePath.endsWith('.js')) {
        return
    }
    replace.sync({
        files: filePath,
        from: /coolmathgames/g,
        to: 'math-stuff.herokuapp',
    });

}

module.exports = {checkDomain};
