import { ThunkDispatch } from "redux-thunk";
import { Store, AnyAction } from "redux";

type MyThunkDispatch = ThunkDispatch<Store, void, AnyAction>;

export default MyThunkDispatch;
