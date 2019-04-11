import mongoose from "mongoose";

export interface IProfile extends mongoose.Document {
  id: string;
  user: string;
  handle: string;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: Array<string>;
  bio?: string;
  githubusername?: string;
  experience: Array<IExperienceItem>;
  education: Array<IEducationItem>;
  social: {
    youtube?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  date: Date;
}

export interface IExperienceItem {
  id?: string;
  title: string;
  company: string;
  location?: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
}

export interface IEducationItem {
  id?: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
}

export default IProfile;
