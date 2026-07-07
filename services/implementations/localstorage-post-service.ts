import { IPostService, Post } from '../interfaces/post-service.interface';

export class LocalStoragePostService implements IPostService {
  private storageKey = 'posts';

  async initialize(): Promise<void> {
    // No asynchronous initialization needed for localStorage implementation
  }

  private getPosts(): Post[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private savePosts(posts: Post[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(posts));
  }

  async create(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const posts = this.getPosts();
    const newPost: Post = {
      ...post,
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id || 0)) + 1 : 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    posts.push(newPost);
    this.savePosts(posts);
    return newPost.id!;
  }

  getById(id: number): Post | null {
    const posts = this.getPosts();
    return posts.find(p => p.id === id) || null;
  }

  getAll(publishedOnly: boolean = false): Post[] {
    const posts = this.getPosts();
    if (publishedOnly) {
      return posts.filter(p => p.published).sort((a, b) => 
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
      );
    }
    return posts.sort((a, b) => 
      new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  }

  async update(id: number, updates: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts[index] = {
        ...posts[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this.savePosts(posts);
    }
  }

  async delete(id: number): Promise<void> {
    const posts = this.getPosts();
    const filtered = posts.filter(p => p.id !== id);
    this.savePosts(filtered);
  }
}
