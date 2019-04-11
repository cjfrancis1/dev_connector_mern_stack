import IClientUser from "./ClientUser.interface";

export interface IClientProfile {
  _id?: string;
  user?: IClientUser | string;
  handle?: string;
  company?: string;
  website?: string;
  location?: string;
  status?: string;
  skills?: Array<string> | string;
  bio?: string;
  githubusername?: string;
  experience?: Array<IClientExperienceItem>;
  education?: Array<IClientEducationItem>;
  social?: {
    youtube?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  date?: Date;
}

export interface IClientExperienceItem {
  _id?: string;
  title?: string;
  company?: string;
  location?: string;
  from?: string;
  to?: string;
  current?: boolean;
  description?: string;
}

export interface IClientEducationItem {
  _id?: string;
  school?: string;
  degree?: string;
  fieldofstudy?: string;
  from?: string;
  to?: string;
  current?: boolean;
  description?: string;
}

export default IClientProfile;
