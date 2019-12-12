export default class LDAPConfig {

    constructor() {
        this.uri = [];
        this.base = null;
        this.caCert = null;
    }

    getLdapUri() {
        return this.ldapUri;
    }

    getBase() {
        return this.base;
    }

    getCaCert() {
        return this.caCert;
    }
}
