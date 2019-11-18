import WebXmlReader from '../WebXmlReader';
import * as path from 'path';

const contextPath = path.resolve('src/__tests__/web.xml');
const wxr = new WebXmlReader(contextPath);

const expected = {"ru.bystrobank.apps.bailverification.db": "mysql://localhost/bailverification",
    "ru.bystrobank.apps.bailverification.db_PASSWORD": null,
    "ru.bystrobank.apps.workflow.cert_PASSWORD": null,
};

test('parses context.xml', () => {
    expect(wxr.getValues()).toStrictEqual(expected);
});
