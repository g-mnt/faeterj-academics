import {useFetch} from "hooks/useFetch";
import {act, renderHook, waitFor} from "@testing-library/react-native";
import {AuthRepository} from "repositories/auth";
import {AxiosError} from "axios";

describe("useFetch test", () => {
    it("should not call function if it doesnt has params", async () => {
        const mockFn = jest.fn();
        renderHook(() => useFetch(mockFn));

        await waitFor(() => expect(mockFn).not.toHaveBeenCalled());
    });

    it("should call function if it has params", async () => {
        const mockFn = jest.fn();
        renderHook(() => useFetch(mockFn, {
            params: {something: "test"}
        }));

        await waitFor(() => expect(mockFn).toHaveBeenCalledWith({something: "test"}));
    });

    it("should set error if request failed", async () => {
        const error = new AxiosError("This is a test")
        const mockFn = jest.fn().mockImplementation( () => {throw error});

        const {result} = renderHook(() => useFetch(mockFn, {
            params: {something: "test"}
        }));

        await waitFor(() => expect(result.current[0].error).toEqual(error));
    });

    it("should return data from fetch function if request succeeded", async () => {
        const validReturn = {
            something: "in here",
            also: "in there",
        }

        const mockFn = jest.fn().mockImplementation(() => new Promise((resolve) =>
            resolve(validReturn))
        );

        const {result} = renderHook(() => useFetch(mockFn));
        const data = await act(() => result.current[1]());

        await waitFor(() => {
            expect(result.current[0].data).toEqual(validReturn);
            expect(data).toEqual(validReturn);
        });
    });

    it("should not define error state if not axios error but it should throw it", async () => {
        const error = new Error("This is a test")
        const mockFn = jest.fn().mockImplementation( () => {throw error});

        const {result} = renderHook(() => useFetch(mockFn));
        try{
            await act(() => result.current[1]());
        }catch(e){
            expect(e).toEqual(error);
        }

        await waitFor(() => {
            expect(result.current[0].error).toEqual(null);
        });
    });
});