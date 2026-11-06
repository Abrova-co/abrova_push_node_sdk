const { test } = require('node:test');
const assert = require('node:assert');
const { Scheduled } = require('../dist/modules/scheduled');

function fakeClient() {
  const calls = [];
  return { calls, post: async (path, body) => (calls.push({ path, body }), body), put: async (path, body) => (calls.push({ path, body }), body) };
}

test("scheduled: targetType 'all' is sent as 'broadcast'; other fields untouched", async () => {
  const c = fakeClient();
  const s = new Scheduled(c);
  await s.create({ title: 't', body: 'b', targetType: 'all', scheduledAt: '2030-01-01T00:00:00Z', channelId: 'offers' });
  assert.deepStrictEqual(c.calls[0].body, { title: 't', body: 'b', targetType: 'broadcast', scheduledAt: '2030-01-01T00:00:00Z', channelId: 'offers' });
  await s.update('id1', { targetType: 'all' });
  assert.strictEqual(c.calls[1].body.targetType, 'broadcast');
});

test('scheduled: other targets pass through as given', async () => {
  const c = fakeClient();
  const s = new Scheduled(c);
  const opts = { title: 't', body: 'b', targetType: 'topic', targetValue: 'news', scheduledAt: '2030-01-01T00:00:00Z' };
  await s.create(opts);
  assert.strictEqual(c.calls[0].body, opts);
  await s.update('id1', { channelId: 'orders' });
  assert.deepStrictEqual(c.calls[1].body, { channelId: 'orders' });
});
