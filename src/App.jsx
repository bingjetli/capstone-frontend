import { useMemo, useState } from 'react';
import AppContent from './components/AppContent';
import { useAnimate } from 'framer-motion';
import Modal from './components/Modal';
import BackIcon from './components/BackIcon';
import ReservationCreateSidebar from './components/ReservationCreateSidebar';
import SettingsContext from './components/SettingsContext';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import SidebarButton from './components/v2/SidebarButton';
import { Button } from './components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReservationsRoute from '@/components/v2/routes/ReservationsRoute';
import ErrorsRoute from '@/components/v2/routes/ErrorsRoute';
import SettingsRoute from '@/components/v2/routes/SettingsRoute';
import BlacklistRoute from '@/components/v2/routes/BlacklistRoute';
import { Toaster } from '@/components/ui/toaster.jsx';
import { NetworkContext } from './components/NetworkContext';
import ReservationRequestsRoute from './components/v2/routes/ReservationRequestsRoute';

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
        element: <ReservationsRoute />,
        errorElement: <ErrorsRoute />,
    },
    {
        path: '/settings',
        element: <SettingsRoute />,
    },
    {
        path: '/reservation-requests',
        element: <ReservationRequestsRoute />,
    },
    {
        path: '/blacklist',
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
