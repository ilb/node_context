import WebXmlReader from '../WebXmlReader';
import * as path from 'path';

const fs = require('fs');
const contextPath = path.resolve('src/__tests__/web.xml');

/**
 * test resolver
 * @param {type} name
 * @returns {String}
 */
const resourceResolver = name => '[[' + name + ']]';

const wxr = new WebXmlReader(fs.readFileSync(contextPath), resourceResolver);

const expected = {"ru.bystrobank.apps.bailverification.db": "mysql://localhost/bailverification",
    "ru.bystrobank.apps.bailverification.db_PASSWORD": null,
    "ru.bystrobank.apps.workflow.cert_PASSWORD": null,
    "ru.bystrobank.apps.workflow.ws": "[[ru.bystrobank.apps.workflow.ws]]",
};

test('parses context.xml', () => {
    expect(wxr.getValues()).resolves.toStrictEqual(expected);
});

