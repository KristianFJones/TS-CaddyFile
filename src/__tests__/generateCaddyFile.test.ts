// src/__tests__/generateCaddyFile.test.ts
import { CaddyFile } from '../types';
import { generateCaddyFile } from '../CaddyFileGenerator';
import { parseCaddyFile } from '../CaddyFileParser';
import { CaddyFileSample1, CaddyFileSample2 } from './Samples';

const CaddyFile1: CaddyFile = {
  'https://kristianjones.dev': {
    directives: [
      { type: 'proxy', from: '/api', to: 'http://newNS' },
      {
        type: 'basicauth',
        username: 'KristianFJones',
        password: '@Hope6699',
        realm: 'test',
        files: ['/', '/api']
      },
      {
        type: 'tls',
        certificate: '/SSL/kristianjones.dev.pem',
        key: '/SSL/kristianjones.dev.key'
      },
      { type: 'gzip' },
      { type: 'expvar', path: '/test' }
    ]
  }
};

const CaddyFile2: CaddyFile = {
  'https://kristianjones.dev': {
    directives: [
      { type: 'proxy', from: '/api', to: 'http://newNS-api', websocket: true },
      { type: 'proxy', from: '/', to: 'http://newns-ui:81' }
    ]
  }
};

describe('Generate CaddyFile', () => {
  test('Test Generation 1', () => {
    const CaddyFileObj = generateCaddyFile(CaddyFile1);
    expect(CaddyFileObj).toMatchInlineSnapshot(`
                  "https://kristianjones.dev {
                  	proxy /api http://newNS
                  	basicauth \\"KristianFJones\\" @Hope6699 {
                  		realm \\"test\\"
                  		/
                  		/api
                  	}
                  	tls /SSL/kristianjones.dev.pem /SSL/kristianjones.dev.key
                  	gzip
                  	expvar /test
                  }"
            `);
  });
  test('Test Generation CaddyFile 2', () =>
    expect(generateCaddyFile(CaddyFile2)).toMatchInlineSnapshot(`
      "https://kristianjones.dev {
      	proxy /api http://newNS-api {
      		websocket
      	}
      	proxy / http://newns-ui:81
      }"
    `));
  test('Parse and compare sample 1', () => {
    const Test1OBJ = parseCaddyFile(CaddyFileSample1);
    const Test1STR = generateCaddyFile(Test1OBJ);
    expect(parseCaddyFile(Test1STR)).toEqual(Test1OBJ);
  });
  test(`Parse Sample2 then generate and equal`, () => {
    const Test2OBJ = parseCaddyFile(CaddyFileSample2);
    const Test2STR = generateCaddyFile(Test2OBJ);
    expect(parseCaddyFile(Test2STR)).toEqual(Test2OBJ);
  });
});
