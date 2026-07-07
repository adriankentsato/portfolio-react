export interface ISettingsService {
  set(key: string, value: string): Promise<void>;
  get(key: string): string | null;
  getAll(): Record<string, string>;
  delete(key: string): Promise<void>;
}
