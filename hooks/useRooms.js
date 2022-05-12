import useSWR, { SWRConfiguration } from 'swr';

//const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useRooms = (url, config) => {

    const { data, error } = useSWR(`http://localhost:4000/api${url}`, config);


    return{
        rooms: data || [],
        isLoading: !error && !data,
        isError: error
    }
}