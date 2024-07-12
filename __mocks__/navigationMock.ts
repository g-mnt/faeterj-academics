export const mockNavigateFn = jest.fn()
jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: mockNavigateFn
    })
}))