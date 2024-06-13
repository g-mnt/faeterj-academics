export const mockUser = {
    id: 1,
    name: "Gabriel Monteiro",
    email: "gabriel@faeterj.com",
    avatar_url: null
}

export const mockSetUserFn = jest.fn();
export const mockUseUserStore= jest.fn().mockReturnValue({
    user: mockUser,
    setUser: mockSetUserFn
});

jest.mock("store/user", () => ({
    useUserStore: mockUseUserStore
}))