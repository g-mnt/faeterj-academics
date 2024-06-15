import {LoginForm} from "screens/login/types";
import {User} from "types/models/user";

export type LoginResponse = {
    token: string,
    user: User,
}

export type AuthRepositoryData = {
    login: (loginForm: LoginForm) => Promise<LoginResponse>
    self: () => Promise<User>
}
