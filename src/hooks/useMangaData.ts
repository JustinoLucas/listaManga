import axios, { AxiosPromise } from "axios"
import { mangaData } from "../interface/mangaData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<mangaData[]> => {
    const response = axios.get(API_URL + '/listamanga');
    return response;
}

export function useMangaData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['manga-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}