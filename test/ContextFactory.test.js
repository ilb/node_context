import ContextFactory from '../src/ContextFactory';
import * as path from 'path';
import LDAPFactory from '@ilb/node_ldap';

const webXmlPath = path.resolve('test/web.xml');
const contextXmlPath = path.resolve('test/context.xml');
const ldapFactory = new LDAPFactory('test/ldap.conf');

const contextFactory = new ContextFactory({ webXmlPath, contextXmlPath, ldapFactory });

const expected = {
  'ru.bystrobank.apps.bailverification.db': 'mysql://localhost/bailverification',
  'ru.bystrobank.apps.bailverification.db_PASSWORD': null,
  'ru.bystrobank.apps.workflow.cert_PASSWORD': 'cert_pass_here',
  'ru.bystrobank.apps.workflow.ws': 'https://devel.net.ilb.ru/workflow-web/web'
};

test('buildContext', async () => {
  const context = await contextFactory.buildContext();
  expect(context).toStrictEqual(expected);
});
// runing two tests hangs. TODO
// test('build', async () => {
//   await contextFactory.build();
//   const expected = 'https://devel.net.ilb.ru/workflow-web/web';
//   expect(process.env['ru.bystrobank.apps.workflow.ws']).toBe(expected);
// });
