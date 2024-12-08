export interface Profile {
  about?: string;
  displayName?: string;
  status?: string;
  picture?: string;
}

export interface ProfilePicture {
  url: string;
  mimetype: string;
}

export interface ProfileUpdate {
  about?: string;
  displayName?: string;
  status?: string;
}

export interface PrivacySettings {
  lastSeen?: 'all' | 'contacts' | 'none';
  online?: 'all' | 'contacts' | 'none';
  profilePhoto?: 'all' | 'contacts' | 'none';
  status?: 'all' | 'contacts' | 'none';
  readReceipts?: 'all' | 'contacts' | 'none';
  groupAdd?: 'all' | 'contacts' | 'none';
}
