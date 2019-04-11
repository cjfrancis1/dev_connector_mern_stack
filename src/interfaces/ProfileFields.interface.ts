export interface IProfileFields {
  user?: string;
  handle?: string;
  company?: string;
  website?: string;
  location?: string;
  bio?: string;
  status?: string;
  skills?: string;
  githubusername?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

export interface IProfileFieldsFormatted {
  user?: string;
  handle?: string;
  company?: string;
  website?: string;
  location?: string;
  bio?: string;
  status?: string;
  skills?: Array<string>;
  githubusername?: string;
  social?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}
