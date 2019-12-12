import WebXmlReader from '../WebXmlReader';
import * as path from 'path';

const fs = require('fs');
const contextPath = path.resolve('src/__tests__/web.xml');

const wxr = new WebXmlReader(fs.readFileSync(contextPath));

const expected = {"ru.bystrobank.apps.bailverification.db": "mysql://localhost/bailverification",
    "ru.bystrobank.apps.bailverification.db_PASSWORD": null,
    "ru.bystrobank.apps.workflow.cert_PASSWORD": null,
};

test('parses context.xml', () => {
    expect(wxr.getValues()).resolves.toStrictEqual(expected);
});

test('has own property', async () => {
    const values = await wxr.getValues();
    expect(values.hasOwnProperty('ru.bystrobank.apps.workflow.cert_PASSWORD')).toBe(true);
});
