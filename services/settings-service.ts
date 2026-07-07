import { IDatabase } from './interfaces/database.interface';
import { ISettingsService } from './interfaces/settings-service.interface';

export class SettingsService implements ISettingsService {
  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  async set(key: string, value: string): Promise<void> {
    const sql = `
      INSERT INTO settings (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP
    `;
    this.db.execute(sql, [key, value, value]);
    await this.db.save();
  }

  get(key: string): string | null {
    const results = this.db.query('SELECT value FROM settings WHERE key = ?', [key]);
    return results[0]?.value || null;
  }

  getAll(): Record<string, string> {
    const results = this.db.query('SELECT key, value FROM settings');
    const settings: Record<string, string> = {};
    results.forEach((row: any) => {
      settings[row.key] = row.value;
    });
    return settings;
  }

  async delete(key: string): Promise<void> {
    this.db.execute('DELETE FROM settings WHERE key = ?', [key]);
    await this.db.save();
  }
}
