import {AuthRepositoryData, LoginResponse} from "repositories/auth/types";
import {api} from "src/services/api";

export const AuthRepository: AuthRepositoryData = {
    login: async (form) => {
        const {data} = await api.post<LoginResponse>("login", form);
        return data;
    }
}