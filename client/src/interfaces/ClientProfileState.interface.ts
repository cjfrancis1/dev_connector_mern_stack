import IClientProfile from "./ClientProfile.interface";

export default interface IClientProfileState {
  profile: IClientProfile | undefined;
  profiles: Array<IClientProfile> | undefined;
  loading: boolean;
}
