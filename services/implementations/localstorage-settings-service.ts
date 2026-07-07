import { ISettingsService } from '../interfaces/settings-service.interface';

export class LocalStorageSettingsService implements ISettingsService {
  private storageKey = 'settings';

  private getSettings(): Record<string, string> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  private saveSettings(settings: Record<string, string>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(settings));
  }

  async set(key: string, value: string): Promise<void> {
    const settings = this.getSettings();
    settings[key] = value;
    this.saveSettings(settings);
  }

  get(key: string): string | null {
    const settings = this.getSettings();
    return settings[key] || null;
  }

  getAll(): Record<string, string> {
    return this.getSettings();
  }

  async delete(key: string): Promise<void> {
    const settings = this.getSettings();
    delete settings[key];
    this.saveSettings(settings);
  }
}
