import { createContext, useContext } from 'react';

const NetworkContext = createContext(null);
const useNetworkContext = () => {
    const context = useContext(NetworkContext);
    if (!context) {
        throw new Error(
            `A component using the NetworkContext was used outside of a NetworkContext Provider.`
        );
    }

    return context;
};

export { NetworkContext, useNetworkContext };
