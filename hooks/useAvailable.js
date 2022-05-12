import useSWR, { SWRConfiguration } from 'swr';

//const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useAvailable = (config) => {

    const { data, error } = useSWR(`http://localhost:4000/api/rooms/disponibles`, config);

    return{
        roomsAvailable: data || [],
        isLoading: !error && !data,
        isError: error
    }
}