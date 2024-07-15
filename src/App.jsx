import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster.jsx';
import BlacklistRoute from '@/components/v2/routes/BlacklistRoute';
import ErrorsRoute from '@/components/v2/routes/ErrorsRoute';
import ReservationsRoute from '@/components/v2/routes/ReservationsRoute';
import SettingsRoute from '@/components/v2/routes/SettingsRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NetworkContext } from './components/NetworkContext';
import ReservationRequestsRoute from './components/v2/routes/ReservationRequestsRoute';
import LandingRoute from './components/v2/routes/LandingRoute';

/** HOW TO WORKAROUND RENDER'S 50+ second Boot Up Time
 *
 * Have local data that can be loaded immediately while the server tries
 * to fetch the backend data.
 *
 * When the backend data is available, notify the user and update with
 * the fresh data.
 *
 */

const the_router = createBrowserRouter([
    {
        path: '/',
        element: <LandingRoute />,
        errorElement: <ErrorsRoute />,
    },
    {
        path: '/app/reservations',
        element: <ReservationsRoute />,
    },
    {
        path: '/app/settings',
        element: <SettingsRoute />,
    },
    {
        path: '/app/reservation-requests',
        element: <ReservationRequestsRoute />,
    },
    {
        path: '/app/blacklist',
        element: <BlacklistRoute />,
    },
]);

export default function App() {
    //TODO: Don't make this state, this doesn't need to trigger a re-render.
    const [last_network_request, setLastNetworkRequest] = useState(0);
    const [last_network_state, setLastNetworkState] = useState(null);

    const apiFetch = (resource, options) => {
        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;

        setLastNetworkRequest(Date.now());
        return fetch(`${backend_api_endpoint}${resource ?? ''}`, options);
    };

    return (
        <>
            <NetworkContext.Provider
                value={{
                    last_network_request,
                    setLastNetworkRequest,
                    last_network_state,
                    setLastNetworkState,
                    apiFetch,
                }}
            >
                <RouterProvider router={the_router} />
                <Toaster />
            </NetworkContext.Provider>
        </>
    );
}
