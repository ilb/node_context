//var context = require('../context');


import context from '../context';

const fs = require('fs');
const path = require('path');

const contextPath = path.resolve('src/__tests__/context.xml');
const contextxml = fs.readFileSync(contextPath, 'utf8');

const expected = {"ru.bystrobank.apps.workflow.certfile": "/certs/application.pem", "ru.bystrobank.apps.workflow.cert_PASSWORD": "cert_pass_here"};
test('parses context.xml', () => {
    expect(context.parseContextXml(contextxml)).toStrictEqual(expected);
});
