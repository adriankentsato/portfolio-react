import { IDatabase } from './interfaces/database.interface';
import { IPostService, Post } from './interfaces/post-service.interface';

export class PostService implements IPostService {
  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  async initialize(): Promise<void> {
    // Database and tables are initialized globally by DatabaseService
  }

  async create(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const sql = `
      INSERT INTO posts (title, content, published)
      VALUES (?, ?, ?)
    `;
    this.db.execute(sql, [post.title, post.content, post.published ? 1 : 0]);
    await this.db.save();
    
    const result = this.db.query('SELECT last_insert_rowid() as id');
    return result[0].id;
  }

  getById(id: number): Post | null {
    const results = this.db.query('SELECT * FROM posts WHERE id = ?', [id]);
    return results[0] || null;
  }

  getAll(publishedOnly: boolean = false): Post[] {
    if (publishedOnly) {
      return this.db.query('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC');
    }
    return this.db.query('SELECT * FROM posts ORDER BY created_at DESC');
  }

  async update(id: number, updates: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.content !== undefined) {
      fields.push('content = ?');
      values.push(updates.content);
    }
    if (updates.published !== undefined) {
      fields.push('published = ?');
      values.push(updates.published ? 1 : 0);
    }

    if (fields.length === 0) return;

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const sql = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
    this.db.execute(sql, values);
    await this.db.save();
  }

  async delete(id: number): Promise<void> {
    this.db.execute('DELETE FROM posts WHERE id = ?', [id]);
    await this.db.save();
  }
}
