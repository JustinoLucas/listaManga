import axios, { AxiosPromise } from "axios"
import { mangaData } from "../interface/mangaData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./useMangaData"

const API_URL = 'http://localhost:8080';

const postData = async (data: mangaData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/listamanga', data);
    return response;
}

export function useMangaDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['manga-data']})
        }
    })

    return mutate;
}