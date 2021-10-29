import {User} from "../../model/User";

export default interface AuthState {
    user: User | null;
    token: string | null;
    authenticated: boolean,
    address: string,
}
