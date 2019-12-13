import OpenLDAPConfig from '../OpenLDAPConfig';
import LDAPClientConfig from '../LDAPClientConfig';
import LDAPLastMod from '../LDAPLastMod';
import LdapClient from 'ldapjs-client';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/LDAP/__tests__/ldap.conf');

const ldapConfig = new OpenLDAPConfig(ldapConfPath);
//const LdapClient = require('ldapjs-client');


const expected = '123';

test('parseConfig', async () => {
    const ldapClient = new LdapClient(new LDAPClientConfig(ldapConfig));
    const ldapLastMod = new LDAPLastMod(ldapClient);
    const lmdt = await ldapLastMod.getLastMod();
    expect(isNaN(lmdt.getTime())).toBe(false);
    ldapClient.unbind();
});
