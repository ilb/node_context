import OpenLDAPConfig from '../OpenLDAPConfig';
import LDAPLastMod from '../LDAPLastMod';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/LDAP/__tests__/ldap.conf');

const ldapConfig = new OpenLDAPConfig(ldapConfPath);
const ldapLastMod = new LDAPLastMod(ldapConfig);

const expected = '123';

test('parseConfig', async () => {
    const lmdt = await ldapLastMod.getLastMod();
    expect(isNaN(lmdt.getTime())).toBe(false);
});
