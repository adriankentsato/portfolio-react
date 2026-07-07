export interface Post {
  id?: number;
  title: string;
  content: string;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IPostService {
  initialize(): Promise<void>;
  create(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<number>;
  getById(id: number): Post | null;
  getAll(publishedOnly?: boolean): Post[];
  update(id: number, updates: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>): Promise<void>;
  delete(id: number): Promise<void>;
}

