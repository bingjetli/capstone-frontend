import { useEffect } from 'react';
import { useToast } from '../ui/use-toast';

import {
    CircleDotDashed,
    CircleDashed,
    CircleCheck,
    CircleHelp,
    CircleAlert,
} from 'lucide-react';
import { useNetworkContext } from '../NetworkContext';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

const FETCH_TIMEOUT_SEC = 60 * 3;
//If more than 5 minutes has passed since the last network request, we
//should try to ping the server in order to update the connection state.
const MIN_PING_ELAPSED_MS = 60 * 5 * 1000;

export function BackendConnectionIndicator({ hidden = false }) {
    const {
        last_network_request,
        setLastNetworkRequest,
        last_network_state,
        setLastNetworkState,
        apiFetch,
    } = useNetworkContext();

    const { toast: sendToast } = useToast();

    useEffect(() => {
        // console.log(last_network_request);
        //Side effect that occurs once the component is mounted, it tries
        //to ping the backend server if it has been some time since a network
        //request was last made...

        if (Date.now() - last_network_request < MIN_PING_ELAPSED_MS) {
            //If we take the current unix timestamp, and find the difference
            //between the last network request (which should also be in ms),
            //and we find that the difference is shorter than the minimum
            //elapsed time requirement to send another ping, we cancel
            //the pinging fetch request.
            return;
        }

        const fetch_timout_timer = setTimeout(() => {
            //Basically, if we haven't received a response from the server
            //yet, this timer will still ber running because we should
            //clear this timer once we get a response. Therefore, if this
            //block of code gets to execute, we've timed out on the fetch request.
            // sendToast({
            //     title: 'Connection Timed Out',
            //     description:
            //         'It seems like the backend server is unreachable at the moment, please try again at a later time.',
            // });
            clearTimeout(fetch_timout_timer);
            setLastNetworkState('timedout');
        }, FETCH_TIMEOUT_SEC * 1000);

        //Notify the user that we are about to make the pinging fetch request...
        // sendToast({
        //     title: 'Attempting to connect to backend',
        //     description:
        //         'The backend is hosted on Render, their free plan has a boot time due to the server spinning down from inactivity. Please wait while we attempt to connect the server.',
        // });

        //Construct the pinging fetch request..
        // setLastNetworkRequest(Date.now());
        setLastNetworkState('fetching');
        // const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        apiFetch().then(() => {
            //If we got a response...
            // sendToast({
            //     title: 'Connected',
            //     description: 'Successfully connected to the backend server!',
            // });
            clearInterval(fetch_timout_timer);
            setLastNetworkState('connected');
        });
    }, []);

    if (hidden) {
        return null;
    }

    switch (last_network_state) {
        case null:
            return (
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="p-2">
                            <CircleDashed />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <p className="typography-body">
                            Preparing to connect to the backend API.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            );
        case 'fetching':
            return (
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="p-2">
                            <CircleDotDashed className="stroke-sky-500 animate-ping" />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <p className="typography-body">
                            Please wait while we attempt to connect to the
                            backend API.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            );
        case 'timedout':
            return (
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="p-2">
                            <CircleAlert className="stroke-orange-500" />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <p className="typography-body">
                            The connection to the backend API timed out. Please
                            try again later.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            );
        case 'connected':
            return (
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="p-2">
                            <CircleCheck className="stroke-green-500" />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <p className="typography-body">
                            Successfully connected to the backend API.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            );
        default:
            return (
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="p-2">
                            <CircleHelp className="stroke-slate-500" />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <p className="typography-body">
                            An unknown error occured.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            );
    }
}
