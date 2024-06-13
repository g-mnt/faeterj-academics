import {useCallback, useEffect, useState} from "react";
import {FetchApiProps, FetchApiReturn} from "hooks/useFetch/types";
import {AxiosError} from "axios";

export const useFetch = <P, T>(
    fetchFunction: (v: P) => Promise<T>,
    {
        params
    }:FetchApiProps<P> = {}
): FetchApiReturn<P,T> => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const fetchRequest = useCallback(async (newParams?: P) => {
        setLoading(true);
        try{
            const data = await fetchFunction(newParams ? newParams : params ? params : {} as P);
            setData(data);
            return data;
        }catch(error){
            if(error instanceof AxiosError){
                setError(error);
                return null;
            }
            throw error;
        }finally{
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        if(params){
            fetchRequest().catch(() => {});
        }
    }, []);

    return [
        {data, isLoading, error},
        fetchRequest
    ]
}