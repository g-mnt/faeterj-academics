export const mockNavigateFn = jest.fn()
jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigation: {
            navigate: mockNavigateFn
        }
    })
}))