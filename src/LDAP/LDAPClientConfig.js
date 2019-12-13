/**
 * params structure for ldapjs-client
 */
class LDAPClientConfig {

    constructor(ldapConfig) {
        this.url = ldapConfig.getUri()[0];
        if (ldapConfig.getCaCert()) {
            const fs = require('fs');
            this.tlsOptions = [fs.readFileSync(ldapConfig.getCaCert())];
        }
    }
}

export default LDAPClientConfig;
