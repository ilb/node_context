import LDAPConfig from '../LDAPConfig';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/LDAP/__tests__/ldap.conf');

const ldapConfig = new LDAPConfig(ldapConfPath);

const expectedConfig = {BASE: 'dc=example,dc=com',
    TLS_CACERT: "/etc/ssl/certs/ourCAbundle.crt",
    URI: 'ldapi:/// ldap://ldap.example.com ldaps://ldap-master.example.com:666'};

test('parseConfig', () => {
    expect(LDAPConfig.parseConfig(ldapConfPath)).toStrictEqual(expectedConfig);
});


const expectedUri = ['ldap://ldap.example.com', 'ldaps://ldap-master.example.com:666'];

test('getLdapUri', () => {
    expect(ldapConfig.getLdapUri()).toStrictEqual(expectedUri);
});


test('getBase', () => {
    expect(ldapConfig.getBase()).toBe('dc=example,dc=com');
});

test('getCaCert', () => {
    expect(ldapConfig.getCaCert()).toBe('/etc/ssl/certs/ourCAbundle.crt');
});
