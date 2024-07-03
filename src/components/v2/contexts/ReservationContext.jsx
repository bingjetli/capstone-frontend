import { createContext, useContext } from 'react';

const ReservationContext = createContext(null);
const useReservationContext = (filename = 'a component') => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error(
            `${filename} needs to be a child of ReservationContext.Provider.`
        );
    }

    return context;
};

export { ReservationContext, useReservationContext };
