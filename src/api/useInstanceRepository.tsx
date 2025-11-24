import { useContext } from 'react';
import { ApiAdapterContext } from '../context/ApiAdapterContext';

export default function useInstanceRepository () {
    const { post } = useContext(ApiAdapterContext)
    const resendInstance = (instanceId: string) => {
        return post<string>(`/api/intern/handlinger/instanser/${instanceId}/prov-igjen`)
    };

    return {
        resendInstance
    }

}