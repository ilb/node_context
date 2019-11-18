function config(opts) {
    opts = opts || {};
    if (!process.browser) {
        const fs = require('fs');
        const path = require('path');
        const DOMParser = require('xmldom').DOMParser;
        const xpath = require('xpath');

        const contextPath = path.resolve(path.join(process.env.HOME, '.config/context.xml'));

        let contextobj = {};
        if (fs.existsSync(contextPath)) {
            const contextxml = fs.readFileSync(contextPath, 'utf8');
            contextobj = this.parseContextXml(contextxml);
            if (opts.debug) {
                console.log("contextobj: " + JSON.stringify(contextobj));
            }
        }

        let webobj = {};
        const webxmlPath = path.resolve(process.cwd(), 'conf/web.xml');
        if (opts.debug) {
            console.log("webxmlPath: " + webxmlPath);
        }

        if (fs.existsSync(webxmlPath)) {
            const webxml = fs.readFileSync(webxmlPath, 'utf8');
            webobj = this.parseWebXml(webxml);
            if (opts.debug) {
                console.log("webobj: " + JSON.stringify(webobj));
            }
        }

        putEnv(webobj, contextobj);

        // Parses context.xml src into an Object
        this.parseContextXml = function (src) {
            const obj = {};
            const doc = new DOMParser().parseFromString(src.toString());
            xpath.select('//Environment', doc).forEach(function (node, idx) {
                const key = node.getAttribute('name');
                let val = node.getAttribute('value');
                obj[key] = val;
            });
            return obj;
        }

        // Parses web.xml src into an Object
        this.parseWebXml = function (src) {
            const obj = {};
            const doc = new DOMParser().parseFromString(src.toString());
            var select = xpath.useNamespaces({ "j2ee": "http://java.sun.com/xml/ns/j2ee" });

            select('//j2ee:env-entry', doc).forEach(function (node, idx) {
                const key = select('j2ee:env-entry-name', node)[0].firstChild.data;
                const valnodelist = select('j2ee:env-entry-value', node);
                const val = valnodelist.length > 0 ? valnodelist[0].firstChild.data : null;
                obj[key] = val;
            });
            return obj;
        }

        this.putEnv = function (webobj, contextobj) {
            Object.keys(webobj).forEach(function (key) {
                const value = contextobj[key] ? contextobj[key] : webobj[key];
                process.env[key] = value;
                if (opts.debug) {
                    console.log("putEnv: " + key + " = " + value);
                }
            });
        }
    }
}

module.exports = {
    config
};
