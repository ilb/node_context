import PropertyReader from './PropertyReader';

class ContextXmlReader extends PropertyReader {
    constructor(url) {
        super();
        this.url = url;
    }

    getValues() {
        throw new Error("getValues not implemented");
    }
}

export default ContextXmlReader;
