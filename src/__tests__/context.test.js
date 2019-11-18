var context = require('../context');

//import context from '../context';
const fs = require('fs');
const path = require('path');

const contextPath = path.resolve('src/__tests__/context.xml');
const contextxml = fs.readFileSync(contextPath, 'utf8');
var result = context.config.parseContextXml(contextxml);

