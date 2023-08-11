import {contextDefaultValues, SessionContextState} from "./types";
import {createContext, FC, useEffect, useState} from "react";
import Cookies from "js-cookie";

export const SessionContext = createContext<SessionContextState>(
    contextDefaultValues
);

const SessionProvider: FC = ({children}) => {
    const [expires, setExpires] = useState<string>(contextDefaultValues.expires);

    useEffect(()=> {
        const cookie = Cookies.get('user_session')
        if (cookie) {
            setExpires(cookie)
        }
    })

    return (
        <SessionContext.Provider
            value={{
                expires
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;
