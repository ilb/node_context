import * as path from 'path';
import * as fs from 'fs';
import WebXmlReader from './WebXmlReader';
import ContextXmlReader from './ContextXmlReader';
import LDAPFactory from '@ilb/node_ldap';

class ContextFactory {

    constructor(webXmlPath, contextXmlPath) {
        this.webXmlPath = webXmlPath ? webXmlPath : path.resolve(process.cwd(), 'conf/web.xml');
        this.contextXmlPath = contextXmlPath ? contextXmlPath : path.resolve(path.join(process.env.HOME, '.config/context.xml'));
    }

    /**
     * Method populates process.env
     * @returns {undefined}pop
     */
    async build() {
        const context = await this.buildContext();
        Object.assign(process.env, context);
        return context;
    }

    /**
     * Method builds context with values read from web.xml and context.xml
     * context.xml values have higher priority
     * @returns {undefined}
     */
    async buildContext() {
        const ldapFactory = new LDAPFactory();
        const ldapResource = await ldapFactory.getLDAPResource();
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
