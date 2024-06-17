import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { format } from 'date-fns';
import User from './User';

function ReservationRequestsViewerWrapper({ children }) {
    return <div className="h-full bg-slate-200 p-4">{children}</div>;
}

function ReservationRequestCard({ data }) {
    return (
        <div className="bg-slate-50 mb-1 border last-of-type:mb-0 md:mb-2">
            {/** Header */}
            <div className="flex flex-nowrap justify-between px-2 pt-2 md:px-4 md:pt-2">
                <div>
                    <div className="inline-block capitalize me-2 cormorant-garamond-medium text-xl">
                        {data.firstName}
                    </div>
                    <div className="inline-block capitalize cormorant-garamond-medium text-xl">
                        {data.lastName}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-2xl">{data.seats}</div>
                    <div className=" w-4 fill-slate-600">
                        <User />
                    </div>
                </div>
            </div>
            {/** Content */}
            <div className="text-slate-600 px-2 md:px-4">
                <div className="flex flex-nowrap justify-between">
                    <div>{format(data.date, "Mo 'of'  MMMM, yyyy")}</div>
                    <div>{format(data.date, 'HH:MM')}</div>
                </div>
                <div className="text-xs">
                    <div>{data.phoneNumber}</div>
                    <div>{data.email}</div>
                </div>
                <div>{data.notes}</div>
            </div>
            {/** Footer */}
            <div className="flex flex-row-reverse flex-nowrap gap-1 mt-2">
                <button className="text-xs poppins-light px-2 py-2 bg-slate-100">
                    Approve
                </button>
                <button className="text-xs poppins-light px-2 py-2 bg-slate-100">
                    Delete
                </button>
                <button className="text-xs poppins-light px-2 py-2 bg-slate-100">
                    Blacklist
                </button>
            </div>
        </div>
    );
}

export default function ReservationRequestsViewer() {
    const [is_fetching, setIsFetching] = useState(true);
    const [reservation_requests, setReservationRequests] = useState(null);

    useEffect(() => {
        //Run the side effect to begin a fetch request to load all of
        //the reservation requests.

        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        const fetch_url = `${backend_api_endpoint}/api/reservations/fetch?status=requires-approval`;
        fetch(fetch_url)
            .then((r) => r.json())
            .then((json) => {
                setReservationRequests(json.reservations);
                setIsFetching(false);
            });
    }, []);

    if (is_fetching) {
        return (
            <ReservationRequestsViewerWrapper>
                <div>
                    <Spinner />
                </div>
            </ReservationRequestsViewerWrapper>
        );
    }

    if (reservation_requests && reservation_requests.length === 0) {
        return (
            <ReservationRequestsViewerWrapper>
                <div>There are no requests to approve at the moment.</div>
            </ReservationRequestsViewerWrapper>
        );
    }

    return (
        <ReservationRequestsViewerWrapper>
            <div className="overflow-auto h-full pb-[50px]">
                <div className="flex flex-wrap">
                    {reservation_requests.map((r, ri) => (
                        <div
                            className="p-1 w-full md:w-1/2 lg:w-1/3"
                            key={ri}
                        >
                            <ReservationRequestCard
                                data={r}
                                key={ri}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </ReservationRequestsViewerWrapper>
    );
}
