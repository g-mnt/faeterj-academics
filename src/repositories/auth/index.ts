import {AuthRepositoryData, LoginResponse} from "repositories/auth/types";
import {api} from "src/services/api";
import {User} from "types/models/user";

export const AuthRepository: AuthRepositoryData = {
    login: async (form) => {
        const {data} = await api.post<LoginResponse>("login", form);
        return data;
    },

    self: async () => {
        const {data} = await api.get<User>("self");
        return data;
    }
}