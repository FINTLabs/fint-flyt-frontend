import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { IEventNew } from '../types/Event';

interface TableSelectContextProps {
    selectedEvents: Record<number, IEventNew>;
    toggleSelectedEvents: (index: number, event: IEventNew) => void;
    addAllEvents: (events?: IEventNew[]) => void;
    removeAllEvents: () => void;
    selectedSize: number;
}

const TableSelectContext = createContext<TableSelectContextProps | null>(null);

export const useTableSelect = () => {
    const context = useContext(TableSelectContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};

interface TableSelectProviderProps {
    children: ReactNode;
}

export const TableSelectProvider: React.FC<TableSelectProviderProps> = ({ children }) => {
    const [selectedEvents, setSelectedEvents] = useState<Record<number, IEventNew>>({});

    const selectedSize: number = useMemo(
        () => selectedEvents ? Object.keys(selectedEvents).length : 0,
        [selectedEvents]
    );



    const toggleSelectedEvents = (index: number, event: IEventNew) => {
        setSelectedEvents((prev) => {
            const copy = { ...prev };

            if (copy[index]) {
                delete copy[index];
            } else {
                copy[index] = event;
            }

            return copy;
        });
    };


    const addAllEvents = (events?: IEventNew[]) => {
        setSelectedEvents((prev) => {
            const next = { ...prev };

            events?.forEach((event, index) => {
                next[index] = event;
            });

            return next;
        });
    };

    const removeAllEvents = () => {
        setSelectedEvents([]);
    }


    return (
        <TableSelectContext.Provider
            value={{
                selectedEvents,
                toggleSelectedEvents,
                addAllEvents,
                removeAllEvents,
                selectedSize,
            }}
        >
            {children}
        </TableSelectContext.Provider>
    );
};
