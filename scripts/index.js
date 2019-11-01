// var getDirName = require('path').dirname;
// var express = require('express');
var floomaticHanlder = require('./floomaticHandler');
// var request = require('request');
// var fse = require('fs-extra');
floomaticHanlder.init();
const expressHandler = require('./expressHandler');
expressHandler.init();



