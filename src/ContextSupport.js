import WebXmlReader from './WebXmlReader';

class ContextSupport {

    constructor(webXmlPath, contextXmlPath) {
        this.webXmlPath = webXmlPath;
        this.contextXmlPath = contextXmlPath;
    }

    /**
     * Function populates process.env context with values read from web.xml and context.xml
     * context.xml values have higher priority
     * @returns {undefined}
     */
    buildContext() {
        const fs = require('fs');
        const context = {}
        if (this.webXmlPath && fs.existsSync(this.webXmlPath)) {
            const webxml = fs.readFileSync(this.webXmlPath, 'utf8');
            const wxr = new WebXmlReader(webxml);
            Object.assign(context, wxr.getValues());
        }
        return context;
    }

}

export default ContextSupport;
