import IClientUser from "./ClientUser.interface";

export default interface IClientAuthState {
  isAuthenticated: boolean;
  user: IClientUser;
}
