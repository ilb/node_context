import ContextFactory from '../src/ContextFactory';
import * as path from 'path';
import LDAPFactory from '@ilb/node_ldap';

const webXmlPath = path.resolve('test/web.xml');
const contextXmlPath = path.resolve('test/context.xml');
const ldapFactory = new LDAPFactory('test/ldap.conf');
const ldapFactoryUnc = new LDAPFactory('/nonexistent.conf');

process.env.LDAPPREFIX = 'ru.bystrobank';
const contextFactory = new ContextFactory({ webXmlPath, contextXmlPath, ldapFactory });
const contextFactoryUnc = new ContextFactory({
  webXmlPath,
  contextXmlPath,
  ldapFactory: ldapFactoryUnc
});

const expected = {
  '.apps.testapp.db': 'mysql://localhost/testapp',
  'apps.testapp.db_PASSWORD': null,
  'apps.testapp.certfile': '/etc/certs/testapp.pem',
  'apps.testapp.cert_PASSWORD': 'cert_pass_here',
  'ru.bystrobank.apps.workflow.ws': 'https://devel.net.ilb.ru/workflow-web/web'
};

const expectedUnc = {
  '.apps.testapp.db': 'mysql://localhost/testapp',
  'apps.testapp.db_PASSWORD': null,
  'apps.testapp.certfile': '/etc/certs/testapp.pem',
  'apps.testapp.cert_PASSWORD': 'cert_pass_here',
  'ru.bystrobank.apps.workflow.ws': '!LDAP not configured!'
};

test('buildContext', async () => {
  const context = await contextFactory.buildContext();
  expect(context).toStrictEqual(expected);
});

test('buildContextUnc', async () => {
  const context = await contextFactoryUnc.buildContext();
  expect(context).toStrictEqual(expectedUnc);
});
// runing two tests hangs. TODO
// test('build', async () => {
//   await contextFactory.build();
//   const expected = 'https://devel.net.ilb.ru/workflow-web/web';
//   expect(process.env['ru.bystrobank.apps.workflow.ws']).toBe(expected);
// });
