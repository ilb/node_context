import ContextXmlReader from '../ContextXmlReader';
import * as path from 'path';

const contextPath = path.resolve('src/__tests__/context.xml');
const wxr = new ContextXmlReader(contextPath);

const expected = {
    "ru.bystrobank.apps.workflow.certfile": "/certs/application.pem",
    "ru.bystrobank.apps.workflow.cert_PASSWORD": "cert_pass_here"
};
test('parses context.xml', () => {
    expect(wxr.getValues()).toStrictEqual(expected);
});
