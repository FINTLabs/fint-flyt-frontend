import { useContext } from 'react';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
const API_URL = import.meta.env.ACTION_API || '';

export default function useInstanceRepository () {
    const { post } = useContext(ApiAdapterContext)
    const resendInstance = (instanceId: string) => {
        return post<string>(API_URL, `/api/intern/handlinger/instanser/${instanceId}/prov-igjen`);
    };

    return {
        resendInstance
    }

}