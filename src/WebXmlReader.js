import PropertyReader from './PropertyReader';

class WebXmlReader extends PropertyReader {
    constructor(src) {
        super();
        this.src = src;
        this.values = null;

    }
    static parse(src) {
        const DOMParser = require('xmldom').DOMParser;
        const xpath = require('xpath');

        const values = {};
        const doc = new DOMParser().parseFromString(src.toString());
        var select = xpath.useNamespaces({"j2ee": "http://java.sun.com/xml/ns/j2ee"});

        select('//j2ee:env-entry', doc).forEach(function (node, idx) {
            const key = select('j2ee:env-entry-name', node)[0].firstChild.data;
            const valnodelist = select('j2ee:env-entry-value', node);
            const val = valnodelist.length > 0 ? valnodelist[0].firstChild.data : null;
            values[key] = val;
        });
        return values;
    }

    getValues() {
        if (this.values === null) {
            this.values = WebXmlReader.parse(this.src);
        }
        return this.values;
    }
}

export default WebXmlReader;
