import ContextFactory from '../ContextFactory';
import * as path from 'path';

const fs = require('fs');
const webXmlPath = path.resolve('src/__tests__/web.xml');
const contextXmlPath = path.resolve('src/__tests__/context.xml');

const cs = new ContextFactory(webXmlPath,contextXmlPath);

const expected = {"ru.bystrobank.apps.bailverification.db": "mysql://localhost/bailverification",
    "ru.bystrobank.apps.bailverification.db_PASSWORD": null,
    "ru.bystrobank.apps.workflow.cert_PASSWORD": "cert_pass_here",
    "ru.bystrobank.apps.workflow.ws": "https://devel.net.ilb.ru/workflow-web/web",
};

test('builds context', async () => {
    expect(cs.buildContext()).resolves.toStrictEqual(expected);
    await cs.build();

    expect(process.env["ru.bystrobank.apps.workflow.ws"]).toBe("https://devel.net.ilb.ru/workflow-web/web");

    // TEMP LEGACY EMULATION
    ContextFactory.config();

});
