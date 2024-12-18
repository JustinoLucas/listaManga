import axios, { AxiosPromise } from "axios";
import { mangaData } from "../interface/mangaData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./useMangaData"

const API_URL = 'http://localhost:8080';

const updateData = async (id: number, data: mangaData): AxiosPromise<any> => {
    const response = axios.put(`${API_URL}/listamanga/${id}`, data);
    return response;
}

export function useMangaDataUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: ({ id, data }: { id: number; data: mangaData }) => updateData(id, data),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['manga-data'] });
        }
    });

    return mutate;
}