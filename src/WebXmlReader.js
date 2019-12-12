import PropertyReader from './PropertyReader';

class WebXmlReader extends PropertyReader {
    constructor(src) {
        super();
        this.src = src;
        this.values = null;

    }
    static async parse(src) {
        var xml2js = require('xml2js-es6-promise');

        const sourceConfig = await xml2js(src);

        if (!sourceConfig['web-app']) {
            throw new Error(`web.xml should contain web-app node`);
        }
        const parsedConfig = {};
        if (sourceConfig['web-app']['env-entry'] !== undefined) {
            sourceConfig['web-app']['env-entry'].forEach(entry => {
                const val = WebXmlReader.getEnvEntryValue(entry);
                parsedConfig[val.name] = val.value;
            });
        }
        return parsedConfig;
    }
    static getEnvEntryValue(entry) {
        if (entry['env-entry-type'] === undefined) {
            throw new Error("env-entry-type missing, incorrect entry " + JSON.stringify(entry));
        }
        if (entry['env-entry-name'] === undefined) {
            throw new Error("env-entry-name missing, incorrect entry " + JSON.stringify(entry));
        }

        const type = entry['env-entry-type'].toString().trim();
        const name = entry['env-entry-name'].toString().trim();
        const rawValue = entry['env-entry-value'] !== undefined ? entry['env-entry-value'].toString().trim() : null;
        if (type.length === 0) {
            throw new Error("env-entry-type zero length, incorrect entry " + JSON.stringify(entry));
        }
        if (name.length === 0) {
            throw new Error("env-entry-name missing, incorrect entry " + JSON.stringify(entry));
        }
        let value = null;
        if (rawValue !== null) {
            switch (type) {
                case 'java.lang.String':
                    value = rawValue;
                    break;
                case 'java.lang.Boolean':
                    if (['true', 'false'].indexOf(rawValue) === -1) {
                        throw new Error(`env-entry-value = ${rawValue} for type env-entry-type = Boolean isn't defined` + +JSON.stringify(entry));
                    }
                    value = rawValue === 'true' ? true : false;
                    break;
                case 'java.lang.Integer':
                case 'java.lang.Float':
                    value = Number(rawValue);
                    break;
                default:
                    throw new Error(`env-entry-type = ${type} unsupported` + +JSON.stringify(entry));
                    break;
            }
        }
        return {name, value};

    }

    async getValues() {
        if (this.values === null) {
            this.values = WebXmlReader.parse(this.src);
        }
        return this.values;
    }
}

export default WebXmlReader;
