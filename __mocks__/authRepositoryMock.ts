import {User} from "types/models/user";

export const mockLoginUser: User = {
    id: 1,
    name: "Gabriel Monteiro",
    email: "gabriel@faeterj.com",
    avatar_url: null
}
export const mockToken = "login_token";

export const mockLoginFunction = jest.fn().mockImplementation(() => {
    return new Promise((resolve) => resolve({
        user: mockLoginUser,
        token: mockToken
    }))
});
jest.mock("repositories/auth", () => ({
    AuthRepository: {
        login: mockLoginFunction
    }
}))