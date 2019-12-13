export default class LDAPConfig {

    constructor() {
        this.uri = [];
        this.base = null;
        this.caCert = null;
    }

    getUri() {
        return this.uri;
    }

    getBase() {
        return this.base;
    }

    getCaCert() {
        return this.caCert;
    }

    /**
     * get params structure for ldapjs-client
     */
    getParams() {
    }
}
