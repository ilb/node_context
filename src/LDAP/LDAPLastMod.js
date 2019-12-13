export default class LDAPLastMod {

    constructor(ldapClient) {
        this.ldapClient = ldapClient;
    }

    async getLastMod() {
        const options = {
            filter: '(objectClass=lastmod)',
            attributes: ['modifyTimestamp']
        };

        const entries = await this.ldapClient.search("cn=lastmod,c=ru", options);
        let dateLastMod = null;
        if (entries.length===1 && entries[0].modifyTimestamp) {
            const rawLastMod = entries[0].modifyTimestamp.match(/^([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})Z$/);
            dateLastMod = new Date(rawLastMod[1], Number(rawLastMod[2]) - 1, rawLastMod[3], rawLastMod[4], rawLastMod[5], rawLastMod[6]);
        }
        return dateLastMod;
    }
}
