export interface Profile {
  about?: string;
  displayName?: string;
  status?: string;
  picture?: string;
}

export interface ProfileUpdate {
  about?: string;
  displayName?: string;
  status?: string;
}

export interface ProfilePicture {
  url: string;
  mimetype: string;
}
