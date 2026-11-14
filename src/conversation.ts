/**
 * Chat-style notifications: put the result in a message's `data` and the Abrova Push SDKs show it as a conversation
 * (the sender's photo, the conversation's messages together; Android "Conversations", iOS communication
 * notifications, one stacked web notification). A message without these keys looks as before.
 *
 * ```ts
 * await push.send({
 *   userId: 'u-kian',
 *   title: '@ali',
 *   body: 'Is the bike still available?',
 *   data: { ...conversationData({ id: 'room-1', senderName: '@ali', senderAvatarUrl: 'https://…/ali.jpg' }), roomId: 'room-1' },
 * });
 * ```
 */
export interface ConversationOptions {
  /** One notification per id (your chat or room id). */
  id: string;
  /** Who wrote the message. */
  senderName: string;
  /** Tells two senders with the same name apart. */
  senderId?: string;
  /** An https image for the sender's photo. */
  senderAvatarUrl?: string;
  /** The group's name (shown for groups). */
  title?: string;
  /** true for a group conversation. */
  isGroup?: boolean;
}

/** The `data` keys the SDKs read. Values are strings, so they survive every transport (FCM data is string-only). */
export function conversationData(options: ConversationOptions): Record<string, string> {
  const id = String(options.id ?? '').trim();
  if (!id) throw new Error('conversationData: id is required');
  const out: Record<string, string> = {
    conversationId: id,
    senderName: String(options.senderName ?? '').trim(),
    conversationIsGroup: options.isGroup ? 'true' : 'false',
  };
  if (options.senderId) out.senderId = String(options.senderId);
  if (options.senderAvatarUrl) out.senderAvatarUrl = String(options.senderAvatarUrl);
  if (options.title) out.conversationTitle = String(options.title);
  return out;
}
