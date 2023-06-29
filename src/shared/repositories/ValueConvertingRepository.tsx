import axios from "axios";
import {IValueConverting} from "../../features/valueConverting/types/ValueConverting";

const getValueConvertings = (page: number, size: number, sortProperty: string, sortDirection: string, excludeConvertingMap?: boolean) => {
    return axios.get("/api/intern/value-convertings", {
        params: {
            page: page,
            size: size,
            sortProperty: sortProperty,
            sortDirection: sortDirection,
            excludeConvertingMap: excludeConvertingMap
        }
    });
}

const getValueConverting = (valueConvertingId: number) => {
    return axios.get(`/api/intern/value-convertings/${valueConvertingId}`)
}

const createValueConverting = (data: IValueConverting) => {
    return axios.post<IValueConverting>("/api/intern/value-convertings", data);
}

const ValueConvertingRepository = {
    getValueConvertings,
    getValueConverting,
    createValueConverting
};

export default ValueConvertingRepository;
