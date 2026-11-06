import { HttpClient } from '../client';
import { ScheduledMessage, CreateScheduledOptions, UpdateScheduledOptions } from '../types';

/** The API calls "every device" `broadcast`; older SDK types said `all`. */
function withApiTarget<T extends { targetType?: string }>(options: T): T {
  return options.targetType === 'all' ? { ...options, targetType: 'broadcast' } : options;
}

export class Scheduled {
  constructor(private client: HttpClient) {}

  /**
   * Schedule a new message.
   */
  async create(options: CreateScheduledOptions): Promise<ScheduledMessage> {
    return this.client.post<ScheduledMessage>('/scheduled', withApiTarget(options));
  }

  /**
   * List all scheduled messages.
   */
  async list(): Promise<ScheduledMessage[]> {
    return this.client.get<ScheduledMessage[]>('/scheduled');
  }

  /**
   * List pending scheduled messages.
   */
  async listPending(): Promise<ScheduledMessage[]> {
    return this.client.get<ScheduledMessage[]>('/scheduled/pending');
  }

  /**
   * Get a scheduled message by ID.
   */
  async get(id: string): Promise<ScheduledMessage> {
    return this.client.get<ScheduledMessage>(`/scheduled/${id}`);
  }

  /**
   * Update a scheduled message.
   */
  async update(id: string, options: UpdateScheduledOptions): Promise<ScheduledMessage> {
    return this.client.put<ScheduledMessage>(`/scheduled/${id}`, withApiTarget(options));
  }

  /**
   * Cancel a scheduled message.
   */
  async cancel(id: string): Promise<ScheduledMessage> {
    return this.client.post<ScheduledMessage>(`/scheduled/${id}/cancel`);
  }

  /**
   * Delete a scheduled message.
   */
  async delete(id: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/scheduled/${id}`);
  }
}
