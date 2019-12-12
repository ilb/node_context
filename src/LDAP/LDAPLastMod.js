export default class LDAPLastMod {

    constructor(ldapConfig) {
        var LdapClient = require('ldapjs-client');
        const params = { url: ldapConfig.getUri()[0]};
        if (ldapConfig.getCaCert()) {
            const fs = require('fs');
            params.tlsOptions = [fs.readFileSync(ldapConfig.getCaCert())];
        }

        this.ldapClient = new LdapClient(params);
    }

    async getLastMod() {
        const options = {
            filter: '(objectClass=lastmod)',
            attributes: ['modifyTimestamp']
        };

        const entries = await this.ldapClient.search("cn=lastmod,c=ru", options);
        return entries[0].modifyTimestamp;
    }
}
