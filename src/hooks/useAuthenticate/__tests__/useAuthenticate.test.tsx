import {useAuthenticate} from "hooks/useAuthenticate";
import {renderHook, waitFor} from "@testing-library/react-native";
import {mockLoginUser, mockToken} from "mocks/authRepositoryMock";
import * as storage from "src/services/storage";
const storeTokenSpy = jest.spyOn(storage, "storeToken");

describe("useAuthenticate test", () => {
    it("should store token in async storage", async () => {
        const {result} = renderHook(useAuthenticate);
        result.current.authenticate(mockLoginUser, mockToken);

        await waitFor(() => expect(storeTokenSpy).toHaveBeenCalledWith(mockToken));
    });
});