//var context = require('../context');


import context from '../context';

const fs = require('fs');
const path = require('path');

test_parseContextXml();
test_parseWebXml();

function test_parseContextXml() {
    const contextPath = path.resolve('src/__tests__/context.xml');
    const contextxml = fs.readFileSync(contextPath, 'utf8');

    const expected = {
        "ru.bystrobank.apps.workflow.certfile": "/certs/application.pem",
        "ru.bystrobank.apps.workflow.cert_PASSWORD": "cert_pass_here"
    };
    test('parses context.xml', () => {
        expect(context.parseContextXml(contextxml)).toStrictEqual(expected);
    });
}


function test_parseWebXml() {
    const webxmlPath = path.resolve('src/__tests__/web.xml');
    const webxml = fs.readFileSync(webxmlPath, 'utf8');

    const expected = {"ru.bystrobank.apps.bailverification.db": "mysql://localhost/bailverification",
        "ru.bystrobank.apps.bailverification.db_PASSWORD": null,
        "ru.bystrobank.apps.workflow.cert_PASSWORD": null,
    };
    test('parses context.xml', () => {
        expect(context.parseWebXml(webxml)).toStrictEqual(expected);
    });
}
