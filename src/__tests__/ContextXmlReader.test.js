import ContextXmlReader from '../ContextXmlReader';
import * as path from 'path';

const fs = require('fs');
const contextPath = path.resolve('src/__tests__/context.xml');
const cxr = new ContextXmlReader(fs.readFileSync(contextPath));

const expected = {
    "ru.bystrobank.apps.workflow.certfile": "/certs/application.pem",
    "ru.bystrobank.apps.workflow.cert_PASSWORD": "cert_pass_here"
};
test('parses context.xml', () => {
    expect(cxr.getValues()).resolves.toStrictEqual(expected);
});
