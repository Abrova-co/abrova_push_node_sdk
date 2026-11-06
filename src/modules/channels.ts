import { HttpClient } from '../client';
import { NotificationChannel, CreateChannelOptions, UpdateChannelOptions } from '../types';

export class Channels {
  constructor(private client: HttpClient) {}

  /** List the project's notification channels. */
  async list(): Promise<NotificationChannel[]> {
    return this.client.get<NotificationChannel[]>('/channels');
  }

  /** Create a notification channel. */
  async create(options: CreateChannelOptions): Promise<NotificationChannel> {
    return this.client.post<NotificationChannel>('/channels', options);
  }

  /** Update a channel. Changing importance, vibration or sound raises its version. */
  async update(key: string, options: UpdateChannelOptions): Promise<NotificationChannel> {
    return this.client.put<NotificationChannel>(`/channels/${encodeURIComponent(key)}`, options);
  }

  /** Delete a channel. Phones remove it at their next start. */
  async delete(key: string): Promise<void> {
    await this.client.delete<unknown>(`/channels/${encodeURIComponent(key)}`);
  }
}
