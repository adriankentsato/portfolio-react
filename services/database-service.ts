import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { IDatabase } from './interfaces/database.interface';

export class DatabaseService implements IDatabase {
  private static instance: DatabaseService;
  private db: Database | null = null;
  private SQL: SqlJsStatic | null = null;
  private dbName: string = 'web-profile.db';

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initialize(): Promise<void> {
    if (this.db) {
      return;
    }

    try {
      this.SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });

      // Try to load existing database from localStorage
      const savedDb = localStorage.getItem(this.dbName);
      if (savedDb) {
        const uint8Array = new Uint8Array(JSON.parse(savedDb));
        this.db = new this.SQL.Database(uint8Array);
      } else {
        this.db = new this.SQL.Database();
        await this.createTables();
      }
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    this.db.run(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        bio TEXT,
        avatar_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        published BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await this.save();
  }

  async save(): Promise<void> {
    if (!this.db) return;

    try {
      const data = this.db.export();
      const array = Array.from(data);
      localStorage.setItem(this.dbName, JSON.stringify(array));
    } catch (error) {
      console.error('Failed to save database:', error);
      throw error;
    }
  }

  // Generic query method
  query(sql: string, params: any[] = []): any[] {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const stmt = this.db.prepare(sql);
      stmt.bind(params);
      const results: any[] = [];

      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }

      stmt.free();
      return results;
    } catch (error) {
      console.error('Query failed:', error);
      throw error;
    }
  }

  // Generic execute method for INSERT, UPDATE, DELETE
  execute(sql: string, params: any[] = []): void {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      this.db.run(sql, params);
    } catch (error) {
      console.error('Execute failed:', error);
      throw error;
    }
  }




  // Utility methods
  async clearDatabase(): Promise<void> {
    if (!this.db) return;

    this.db.run('DROP TABLE IF EXISTS profiles');
    this.db.run('DROP TABLE IF EXISTS settings');
    this.db.run('DROP TABLE IF EXISTS posts');
    
    await this.createTables();
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export const dbService = DatabaseService.getInstance();
