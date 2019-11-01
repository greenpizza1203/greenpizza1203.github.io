// var getDirName = require('path').dirname;
// var express = require('express');
// var request = require('request');
// var fse = require('fs-extra');
const cacheHandler = require('./cacheHandler');
const yargs = require('yargs');

function handleCommandLine() {

    const argv = yargs
        .option('debug', {
            alias: 'd',
            description: 'Delete Files',
            type: 'boolean',
        })
        .argv;
    if (argv.debug) {
        cacheHandler.clearCache();
    }
}

handleCommandLine();
const expressHandler = require('./expressHandler');
expressHandler.init();



