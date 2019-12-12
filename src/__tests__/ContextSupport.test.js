import ContextSupport from '../ContextSupport';
import * as path from 'path';

const fs = require('fs');
const webXmlPath = path.resolve('src/__tests__/web.xml');
const contextXmlPath = path.resolve('src/__tests__/context.xml');

const cs = new ContextSupport(webXmlPath,contextXmlPath);

const expected = {"ru.bystrobank.apps.bailverification.db": "mysql://localhost/bailverification",
    "ru.bystrobank.apps.bailverification.db_PASSWORD": null,
    "ru.bystrobank.apps.workflow.cert_PASSWORD": "cert_pass_here",
};

test('builds context', () => {
    expect(cs.buildContext()).toStrictEqual(expected);
});
