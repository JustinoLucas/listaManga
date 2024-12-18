import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { mangaData } from "../interface/mangaData";
import "./useMangaData"

const API_URL = 'http://localhost:8080';

const deleteData = async (id: number): AxiosPromise<any> => {
    const response = axios.delete(`${API_URL}/listamanga/${id}`);
    return response;
}

export function useMangaDataDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (id: number) => deleteData(id),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['manga-data'] });
        }
    });

    return mutate;
}