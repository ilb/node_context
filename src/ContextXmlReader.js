import PropertyReader from './PropertyReader';

class ContextXmlReader extends PropertyReader {
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
        xpath.select('//Environment', doc).forEach(function (node, idx) {
            const key = node.getAttribute('name');
            let val = node.getAttribute('value');
            values[key] = val;
        });
        return values;
    }

    getValues() {
        if (this.values === null) {
            this.values = ContextXmlReader.parse(this.src);
        }
        return this.values;
    }
}

export default ContextXmlReader;
