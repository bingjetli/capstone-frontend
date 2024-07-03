import { Separator } from '@/components/ui/separator';
import AppBar from '../AppBar';
import { useNetworkContext } from '@/components/NetworkContext';
import { useEffect, useState } from 'react';
import {
    MasterDetail,
    MasterContent,
    DetailTrigger,
    DetailContent,
} from '../custom-ui/master-detail';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

export default function ReservationRequestsRoute() {
    const { apiFetch } = useNetworkContext();
    const { toast: sendToast } = useToast();

    const [is_fetching, setIsFetching] = useState(false);

    const [reservation_requests, setReservationRequests] = useState([
        null,
        null,
        null,
    ]);

    useEffect(() => {
        apiFetch('/api/reservations/fetch?status=requires-approval')
            .then((r) => r.json())
            .then((json) => {
                setReservationRequests(json.reservations);
            });
    }, []);

    const handleDeleteAction = (id) => {
        const post_payload = {
            id: id,
        };

        setIsFetching(true);
        apiFetch('/api/reservations/delete', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_payload),
        }).then((r) => {
            setIsFetching(false);
            if (r.status === 200) {
                //The request was successful...
                sendToast({
                    title: 'Success',
                    description:
                        'The reservation has been deleted successfully!',
                });
            } else {
                //The request was unsuccessful...
                sendToast({
                    title: 'Error',
                    description:
                        'An error occured while the reservation was being deleted.',
                });
            }
        });
    };

    if (reservation_requests.length <= 0) {
        return (
            <div className="h-screen max-h-screen w-screen flex flex-col">
                <AppBar />
                <Separator />
                <div className="grow max-h-content bg-slate-200">
                    {/* <div className="border rounded-md"> */}
                    {/* adfadf */}
                    {console.log(reservation_requests)}
                    {/* </div> */}

                    <MasterDetail
                        asMainView={true}
                        className="h-full"
                    >
                        <MasterContent className="p-4 bg-background border-e-[1px] flex flex-col">
                            <div className="shrink-0">
                                {/* Header Section */}
                                <h1 className="text-3xl leading-relaxed">
                                    Reservation Requests
                                </h1>
                            </div>
                            <div className="grow flex justify-center items-center">
                                <div className="text-center">
                                    There are no reservation requests to manage
                                    at the moment.
                                </div>
                            </div>
                        </MasterContent>
                    </MasterDetail>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen max-h-screen w-screen flex flex-col">
            <AppBar />
            <Separator />
            <div className="grow max-h-content bg-slate-200">
                {/* <div className="border rounded-md"> */}
                {/* adfadf */}
                {console.log(reservation_requests)}
                {/* </div> */}

                <MasterDetail
                    asMainView={true}
                    className="h-full"
                >
                    <MasterContent className="p-4 bg-background border-e-[1px]">
                        <div>
                            {/* Header Section */}
                            <h1 className="text-3xl leading-relaxed">
                                Reservation Requests
                            </h1>
                        </div>
                        <div className="border rounded-md flex flex-col flex-nowrap mt-4">
                            {/* <DetailTrigger triggerTarget="1">
                                Trigger
                            </DetailTrigger>
                            <DetailTrigger triggerTarget="2">
                                Trigger
                            </DetailTrigger> */}
                            {reservation_requests.map((rr, rri) => {
                                if (!rr) {
                                    return (
                                        <DetailTrigger key={rri}>
                                            <Skeleton
                                                className={'h-4 min-w-40'}
                                            />
                                        </DetailTrigger>
                                    );
                                }

                                return (
                                    <DetailTrigger
                                        key={rr['_id']}
                                        triggerTarget={rr['_id']}
                                    >
                                        {rr['firstName']}
                                    </DetailTrigger>
                                );
                            })}
                        </div>
                    </MasterContent>
                    {/* <DetailContent
                        identifier="1"
                        className="bg-background p-4"
                    >
                        Screen 1
                    </DetailContent>
                    <DetailContent
                        identifier="2"
                        className="bg-background p-4"
                    >
                        Screen 2
                    </DetailContent> */}
                    {reservation_requests.map((rr, rri) => {
                        if (!rr) {
                            return null;
                        }

                        return (
                            <DetailContent
                                key={rr['_id']}
                                identifier={rr['_id']}
                                className="bg-background p-4"
                            >
                                <h2 className="text-xl capitalize font-bold">
                                    {`${rr['firstName']} ${rr['lastName']}`}
                                </h2>
                                <div>{rr['email']}</div>
                                <div>{rr['phoneNumber']}</div>
                                <div>{rr['date']}</div>
                                <div>{rr['seats']}</div>
                                <Separator className="my-4" />
                                <div className="flex flex-col gap-2 max-w-[320px] mx-auto mt-4">
                                    <Button variant="secondary">
                                        Approve Reservation Request
                                    </Button>
                                    {/* Discard Reservation Request Button and Modal Dialog */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive">
                                                Discard Reservation Request
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Discard This Reservation
                                                    Request
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be
                                                    undone, are you sure that
                                                    you want to continue?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex justify-center">
                                                {is_fetching ? (
                                                    <Button disabled>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        <span>Deleting...</span>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleDeleteAction(
                                                                rr['_id']
                                                            )
                                                        }
                                                    >
                                                        Discard
                                                    </Button>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <Button>Blacklist Email</Button>
                                    <Button>Blacklist Phone Number</Button>
                                </div>
                            </DetailContent>
                        );
                    })}
                </MasterDetail>
            </div>
        </div>
    );
}
