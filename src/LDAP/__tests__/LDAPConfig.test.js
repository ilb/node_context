import LDAPConfig from '../LDAPConfig';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/LDAP/__tests__/ldap.conf');

const ldapConfig = new LDAPConfig(ldapConfPath);

const expectedConfig = {BASE: 'dc=example,dc=com',
    TLS_CACERT: "/etc/ssl/certs/ourCAbundle.crt",
    URI: 'ldapi:/// ldaps://devel.net.ilb.ru ldaps://ldap.net.ilb.ru ldaps://ldap2.net.ilb.ru'};

test('parseConfig', () => {
    expect(LDAPConfig.parseConfig(ldapConfPath)).toStrictEqual(expectedConfig);
});


const expectedUri = ['ldaps://devel.net.ilb.ru', 'ldaps://ldap.net.ilb.ru', 'ldaps://ldap2.net.ilb.ru'];

test('getLdapUri', () => {
    expect(ldapConfig.getLdapUri()).toStrictEqual(expectedUri);
});


test('getBase', () => {
    expect(ldapConfig.getBase()).toBe('dc=example,dc=com');
});

test('getCaCert', () => {
    expect(ldapConfig.getCaCert()).toBe('/etc/ssl/certs/ourCAbundle.crt');
});
