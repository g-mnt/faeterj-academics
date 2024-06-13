import {AxiosError} from "axios";

export type FetchApiProps<T> = {
    params?: T,
}

export type FetchApiReturn<P, T> = [{
    data: T | null,
    error: AxiosError | null,
    isLoading: boolean,
},
    (v?: P) => Promise<T | null>
]