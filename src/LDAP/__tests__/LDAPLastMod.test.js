import OpenLDAPConfig from '../OpenLDAPConfig';
import LDAPClientConfig from '../LDAPClientConfig';
import LDAPClientFactory from '../LDAPClientFactory';
import LDAPLastMod from '../LDAPLastMod';
import LdapClient from 'ldapjs-client';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/LDAP/__tests__/ldap.conf');

const ldapConfig = new OpenLDAPConfig(ldapConfPath);
const ldapClientFactory = new LDAPClientFactory();
//const LdapClient = require('ldapjs-client');


const expected = '123';

test('parseConfig', async () => {
    const ldapClient = ldapClientFactory.getLDAPClient(new LDAPClientConfig(ldapConfig));
    const ldapLastMod = new LDAPLastMod(ldapClient);
    const lmdt = await ldapLastMod.getLastMod();
    expect(isNaN(lmdt.getTime())).toBe(false);
    ldapClientFactory.close();
    //ldapClient.unbind();
});

