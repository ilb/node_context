import LDAPConfig from './LDAPConfig';

export default class OpenLDAPConfig extends LDAPConfig{

    constructor(configPath) {
        super();
        this.configPath = configPath || '/etc/openldap/ldap.conf';
        this.ldapSchemasRegexp = /^ldaps?:\/\//;
        this.loadValuesFromConfig();
    }

    loadValuesFromConfig() {
        const config = OpenLDAPConfig.parseConfig(this.configPath);
        if (config.URI) {
            this.uri = config.URI.split(/\s+/).filter(l => l.match(this.ldapSchemasRegexp));
        }
        this.base = config.BASE || null;
        this.caCert = config.TLS_CACERT || null;
    }

    static parseConfig(configPath) {
        const fs = require('fs');
        const config = fs.readFileSync(configPath, 'utf8');
        const alllines = config.split(/\r?\n/);
        const lines = alllines
                .map(l => l.replace(/#.*$/, '').trim()) // remove comments and trim
                .filter(l => l.length > 0); // skip empty lines
        //console.log(lines);
        const map = lines
                .map(l => l.split(/\s(.*)/)) // split by first whitespace
                .reduce(function (map, obj) {
                    map[obj[0]] = obj[1];
                    return map;
                }, {});
        //console.log(map);
        return map;
    }
}
