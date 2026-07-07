export interface IDatabase {
  query(sql: string, params?: any[]): any[];
  execute(sql: string, params?: any[]): void;
  save(): Promise<void>;
}
