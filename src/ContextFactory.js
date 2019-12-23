import WebXmlReader from './WebXmlReader';
import ContextXmlReader from './ContextXmlReader';
import LDAPFactory from '@ilb/node_ldap';
import context from './context';

class ContextFactory {

    constructor(webXmlPath, contextXmlPath) {
        this.webXmlPath = webXmlPath;
        this.contextXmlPath = contextXmlPath;
    }

    /**
     * TEMP LEGACY EMULATION
     * @param {type} params
     * @returns {unresolved}
     */
    static config(params) {
        return context.config(params);
    }

    /**
     * Method populates process.env
     * @returns {undefined}pop
     */
    async build() {
        const context = await this.buildContext();
        Object.assign(process.env, context);
    }

    /**
     * Method builds context with values read from web.xml and context.xml
     * context.xml values have higher priority
     * @returns {undefined}
     */
    async buildContext() {
        const ldapFactory = new LDAPFactory();
        const ldapResource = await ldapFactory.getLDAPResource();
        const fs = require('fs');
        const context = {}
        if (this.webXmlPath && fs.existsSync(this.webXmlPath)) {
            const webxml = fs.readFileSync(this.webXmlPath, 'utf8');
            const wxr = new WebXmlReader(webxml, name => ldapResource.lookup(name));
            const values = await wxr.getValues();
            Object.assign(context, values);
        }

        if (this.contextXmlPath && fs.existsSync(this.contextXmlPath)) {
            const contextXml = fs.readFileSync(this.contextXmlPath, 'utf8');
            const cxr = new ContextXmlReader(contextXml);
            const values = await cxr.getValues();
            ContextFactory.assignExisting(context, values);
        }

        ldapFactory.close();

        return context;
    }

    static assignExisting(target, source) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop) && target.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }
    }

}

export default ContextFactory;
