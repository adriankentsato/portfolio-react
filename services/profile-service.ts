import { IDatabase } from './interfaces/database.interface';
import { IProfileService, Profile } from './interfaces/profile-service.interface';

export class ProfileService implements IProfileService {
  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const sql = `
      INSERT INTO profiles (name, email, bio, avatar_url)
      VALUES (?, ?, ?, ?)
    `;
    this.db.execute(sql, [profile.name, profile.email, profile.bio, profile.avatar_url]);
    await this.db.save();
    
    const result = this.db.query('SELECT last_insert_rowid() as id');
    return result[0].id;
  }

  getById(id: number): Profile | null {
    const results = this.db.query('SELECT * FROM profiles WHERE id = ?', [id]);
    return results[0] || null;
  }

  getAll(): Profile[] {
    return this.db.query('SELECT * FROM profiles ORDER BY created_at DESC');
  }

  async update(id: number, updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.email !== undefined) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    if (updates.bio !== undefined) {
      fields.push('bio = ?');
      values.push(updates.bio);
    }
    if (updates.avatar_url !== undefined) {
      fields.push('avatar_url = ?');
      values.push(updates.avatar_url);
    }

    if (fields.length === 0) return;

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const sql = `UPDATE profiles SET ${fields.join(', ')} WHERE id = ?`;
    this.db.execute(sql, values);
    await this.db.save();
  }

  async delete(id: number): Promise<void> {
    this.db.execute('DELETE FROM profiles WHERE id = ?', [id]);
    await this.db.save();
  }
}
