// conversationData(): the data keys the Push SDKs read to show a message chat-style.
const { test } = require('node:test');
const assert = require('node:assert');
const { conversationData } = require('../dist');

test('direct and group conversations', () => {
  assert.deepStrictEqual(conversationData({ id: 'room-1', senderName: '@ali', senderId: 'u-ali' }), {
    conversationId: 'room-1', senderName: '@ali', conversationIsGroup: 'false', senderId: 'u-ali',
  });
  assert.deepStrictEqual(
    conversationData({ id: 'room-2', senderName: '@sara', isGroup: true, title: 'Family', senderAvatarUrl: 'https://cdn.example/s.jpg' }),
    { conversationId: 'room-2', senderName: '@sara', conversationIsGroup: 'true', senderAvatarUrl: 'https://cdn.example/s.jpg', conversationTitle: 'Family' },
  );
});

test('an id is required', () => {
  assert.throws(() => conversationData({ id: ' ', senderName: 'x' }), /id is required/);
});
