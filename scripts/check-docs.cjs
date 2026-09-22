const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const config = JSON.parse(fs.readFileSync(path.join(root, 'context7.json')));
assert(config.rules.every((rule) => rule.length <= 255));
for (const match of readme.matchAll(/\]\(([^)]+)\)/g)) {
  const link = match[1].split('#')[0];
  if (link && !/^(https?:|mailto:)/.test(link)) {
    assert(fs.existsSync(path.join(root, link)), link);
  }
}
// Run after npm run build, or set DOCS_PACKAGE_DIR to an unpacked release.
const vm = require('node:vm');
const packageDir = process.env.DOCS_PACKAGE_DIR || path.join(root, 'lib');
const Client = require(path.join(packageDir, 'api-client-backend.js'));
const code = [...readme.matchAll(/```javascript\n([\s\S]*?)```/g)][0][1];
const logs = [];
const context = {
  require(name) {
    assert.equal(name, '@lomray/microservices-client-api/api-client-backend');
    return Client;
  },
  console: { log: (value) => logs.push(value), error: (error) => { throw error; } },
  process: { exitCode: 0 },
};
let completed = false;
process.on('exit', (code) => {
  if (!completed && code === 0) {
    console.error('Documentation check did not finish: the example never settled.');
    process.exitCode = 1;
  }
});
(async () => {
  await vm.runInNewContext(code, context);
  assert.equal(logs[0].method, 'demo.echo');
  assert.equal(logs[0].params.message, 'hello');
  assert.equal(logs[0].isThrowError, false);
  const client = new Client({ sendRequest() { throw new Error('Unexpected request'); } });
  await assert.rejects(client.sendRequest([]), /not supported batch requests/);
  assert.equal(client.getLanguage(), undefined);
  assert.equal(config.branch, 'prod');
  completed = true;
  console.log('README example and backend boundaries PASS');
})().catch((error) => { console.error(error); process.exitCode = 1; });
