import WebXmlReader from '../src/WebXmlReader';
import * as fs from 'fs';
import * as path from 'path';

const contextPath = path.resolve('test/web.xml');

/**
 * test resolver
 * @param {type} name
 * @returns {String}
 */
const resourceResolver = async name => '[[' + name + ']]';

const wxr = new WebXmlReader(fs.readFileSync(contextPath), resourceResolver);

const expected = {"ru.bystrobank.apps.bailverification.db": "mysql://localhost/bailverification",
    "ru.bystrobank.apps.bailverification.db_PASSWORD": null,
    "ru.bystrobank.apps.workflow.cert_PASSWORD": null,
    "ru.bystrobank.apps.workflow.ws": "[[ru.bystrobank.apps.workflow.ws]]",
};

test('parses context.xml', () => {
    expect(wxr.getValues()).resolves.toStrictEqual(expected);
});

