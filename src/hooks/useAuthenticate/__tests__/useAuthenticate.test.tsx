import {useAuthenticate} from "hooks/useAuthenticate";
import {act, renderHook, waitFor} from "@testing-library/react-native";
import {mockLoginUser, mockToken} from "mocks/authRepositoryMock";
import * as storage from "src/services/storage";
import * as userStore from "src/store/user";

describe("useAuthenticate test", () => {
    it("should store token in async storage", async () => {
        const storeTokenSpy = jest.spyOn(storage, "storeToken");
        const {result} = renderHook(useAuthenticate);

        await act(() => result.current.authenticate(mockLoginUser, mockToken));
        await waitFor(() => expect(storeTokenSpy).toHaveBeenCalledWith(mockToken));
    });

    it("should set user in store", async () => {
        const mockSetUserFn = jest.fn();
        jest.spyOn(userStore, "useUserStore").mockReturnValue({
            setUser: mockSetUserFn
        });

        const {result} = renderHook(useAuthenticate);

        await act(() => result.current.authenticate(mockLoginUser, mockToken));
        await waitFor(() => expect(mockSetUserFn).toHaveBeenCalledWith(mockLoginUser));
    });
});