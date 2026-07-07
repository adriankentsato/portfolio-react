export interface Profile {
  id?: number;
  name: string;
  email?: string;
  bio?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IProfileService {
  create(profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<number>;
  getById(id: number): Profile | null;
  getAll(): Profile[];
  update(id: number, updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<void>;
  delete(id: number): Promise<void>;
}
