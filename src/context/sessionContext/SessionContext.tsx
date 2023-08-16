import {contextDefaultValues, SessionContextState} from "./types";
import {createContext, FC, useEffect, useState} from "react";
import Cookies from "js-cookie";

export const SessionContext = createContext<SessionContextState>(
    contextDefaultValues
);

const SessionProvider: FC = ({children}) => {
    const [expires, setExpires] = useState<string>(contextDefaultValues.expires);
    const [expired, setExpired] = useState<boolean>(contextDefaultValues.expired)

    useEffect(()=> {
        const cookie = Cookies.get('user_session')
        if (cookie) {
            setExpires(cookie)
            //if current time > cookie expiry
            getExpired().then(r => console.log(r))
        }
    })

    async function getExpired() {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 3 sec
        setExpired(true)
    }

    return (
        <SessionContext.Provider
            value={{
                expires,
                expired
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;
