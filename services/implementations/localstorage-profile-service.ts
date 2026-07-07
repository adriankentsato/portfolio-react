import { IProfileService, Profile } from '../interfaces/profile-service.interface';

export class LocalStorageProfileService implements IProfileService {
  private storageKey = 'profiles';

  private getProfiles(): Profile[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveProfiles(profiles: Profile[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(profiles));
  }

  async create(profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const profiles = this.getProfiles();
    const newProfile: Profile = {
      ...profile,
      id: profiles.length > 0 ? Math.max(...profiles.map(p => p.id || 0)) + 1 : 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    profiles.push(newProfile);
    this.saveProfiles(profiles);
    return newProfile.id!;
  }

  getById(id: number): Profile | null {
    const profiles = this.getProfiles();
    return profiles.find(p => p.id === id) || null;
  }

  getAll(): Profile[] {
    const profiles = this.getProfiles();
    return profiles.sort((a, b) => 
      new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  }

  async update(id: number, updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
    const profiles = this.getProfiles();
    const index = profiles.findIndex(p => p.id === id);
    if (index !== -1) {
      profiles[index] = {
        ...profiles[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this.saveProfiles(profiles);
    }
  }

  async delete(id: number): Promise<void> {
    const profiles = this.getProfiles();
    const filtered = profiles.filter(p => p.id !== id);
    this.saveProfiles(filtered);
  }
}
