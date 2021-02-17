import ContextXmlReader from '../src/ContextXmlReader';
import * as path from 'path';
import * as fs from 'fs';

const contextPath = path.resolve('test/context.xml');
const cxr = new ContextXmlReader(fs.readFileSync(contextPath));

const expected = {
  'ru.bystrobank.apps.workflow.certfile': '/certs/application.pem',
  'ru.bystrobank.apps.workflow.cert_PASSWORD': 'cert_pass_here'
};
test('parses context.xml', async () => {
  const values = await cxr.getValues();
  expect(values).toStrictEqual(expected);
});
