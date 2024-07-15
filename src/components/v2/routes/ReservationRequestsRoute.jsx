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
import { H1, H2, P } from '../custom-ui/typography';
import { format, parseISO } from 'date-fns';

export default function ReservationRequestsRoute() {
    const [fetch_trigger, setFetchTrigger] = useState(false);
    const refreshReservationRequestData = () => setFetchTrigger(!fetch_trigger);

    const [detail_content_target, setDetailContentTarget] = useState(null);

    const { apiFetch } = useNetworkContext();
    const { toast: sendToast } = useToast();

    //action_state is used to keep track of which action is currently
    //being processed by the app. For Example, null means there is no
    //action currently being processed, "fetch-delete" means that there
    //is a fetch request occuring and the delete action is being processed;
    //"fetch-approve" is the same, but meaning that there is an approve
    //action being processed.
    const [action_state, setActionState] = useState(null);

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
    }, [fetch_trigger]);

    const handleDeleteAction = (id) => {
        const post_payload = {
            id: id,
        };

        setActionState('fetch-delete');
        // setIsFetching(true);
        apiFetch('/api/reservations/delete', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_payload),
        }).then((r) => {
            setActionState(null);
            if (r.status === 200) {
                //The request was successful...
                sendToast({
                    title: 'Success',
                    description:
                        'The reservation has been deleted successfully!',
                });

                //Return the current viewport back the to master screen
                //and refresh the reservation request data.
                setDetailContentTarget(null);
                refreshReservationRequestData();
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

    const handleApproveAction = (id) => {
        //create the post payload
        const post_payload = {
            id: id,
            status: 'reserved',
        };

        //Now make the fetch request...
        setActionState('fetch-approve');
        apiFetch('/api/reservations/update/status', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_payload),
        }).then((r) => {
            // setIsFetching(false);
            setActionState(null);
            if (r.status === 200) {
                //The request was successful...
                sendToast({
                    title: 'Success',
                    description:
                        'The reservation has been approved successfully...',
                });
                //Return the current viewport back the to master screen
                //and refresh the reservation request data.
                setDetailContentTarget(null);
                refreshReservationRequestData();
            } else {
                //The request was unsuccessful...
                sendToast({
                    title: 'Error',
                    description:
                        'An error occured while attempting to approve the reservation request...',
                });
            }
        });
    };

    const handleBlacklistEmailAction = (id, email) => {
        const post_payload = {
            id: id,
            email: email,
        };

        console.log(post_payload);

        setActionState('fetch-blacklist-email');
        apiFetch('/api/blacklist/create', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_payload),
        }).then((r) => {
            setActionState(null);
            if (r.status === 201) {
                //The request was successful...
                sendToast({
                    title: 'Success',
                    description: 'The email has been added to the blacklist',
                });
                //Return the current viewport back the to master screen
                //and refresh the reservation request data.
                setDetailContentTarget(null);
                refreshReservationRequestData();
            } else {
                //The request was unsuccessful...
                sendToast({
                    title: 'Error',
                    description:
                        'There was an error adding this email to the blacklist',
                });
            }
        });
    };

    const handleBlacklistPhoneNumberAction = (id, phone_number) => {
        const post_payload = {
            id: id,
            phoneNumber: phone_number,
        };

        setActionState('fetch-blacklist-phone-number');
        apiFetch('/api/blacklist/create', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_payload),
        }).then((r) => {
            setActionState(null);
            if (r.status === 201) {
                //The request was successful...
                sendToast({
                    title: 'Success',
                    description:
                        'The phone number has been added to the blacklist',
                });
                //Return the current viewport back the to master screen
                //and refresh the reservation request data.
                setDetailContentTarget(null);
                refreshReservationRequestData();
            } else {
                //The request was unsuccessful...
                sendToast({
                    title: 'Error',
                    description:
                        'There was an error adding this phone number to the blacklist',
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
                    <MasterDetail
                        asMainView={true}
                        className="h-full"
                    >
                        <MasterContent className="p-4 bg-background border-e-[1px] flex flex-col">
                            <div className="shrink-0">
                                {/* Header Section */}
                                <H1>Reservation Requests</H1>
                            </div>
                            <div className="grow flex justify-center items-center">
                                <div className="text-center">
                                    <P>
                                        There are no reservation requests to
                                        manage at the moment.
                                    </P>
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
                <MasterDetail
                    asMainView={true}
                    className="h-full"
                    active_detail_override={detail_content_target}
                    onActiveDetailChange={(new_target) =>
                        setDetailContentTarget(new_target)
                    }
                >
                    <MasterContent className="p-4 bg-background border-e-[1px]">
                        <div>
                            {/* Header Section */}
                            <H1>Reservation Requests</H1>
                        </div>
                        <div className="border rounded-md flex flex-col flex-nowrap mt-4 overflow-y-auto max-h-reservation-request-viewer">
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
                                        <div className="capitalize">
                                            <P>{rr['firstName']}</P>
                                        </div>
                                    </DetailTrigger>
                                );
                            })}
                        </div>
                    </MasterContent>
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
                                <div className="flex flex-nowrap gap-4">
                                    {/* Firstname & Last Name */}
                                    <div className="grow">
                                        <div className="capitalize text-3xl font-bold">
                                            {rr['firstName']}
                                        </div>
                                        <Separator />
                                        <div className="capitalize text-lg text-muted-foreground">
                                            {rr['lastName']}
                                        </div>
                                    </div>
                                    {/* Seats */}
                                    <div className="">
                                        <div className="text-6xl text-center font-bold">
                                            {rr['seats']}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {rr['seats'] > 1
                                                ? 'people'
                                                : 'person'}
                                        </div>
                                    </div>
                                </div>
                                {rr && rr['date'] ? (
                                    <div className="font-bold text-muted-foreground">
                                        <P>
                                            {format(
                                                parseISO(rr['date']),
                                                'PPPPp'
                                            )}
                                        </P>
                                    </div>
                                ) : null}
                                {/* Additional Notes Section */}
                                {rr['notes'] ? (
                                    <p className="mt-2 break-words max-w-reservation-detail-content">
                                        {rr['notes']}
                                    </p>
                                ) : null}
                                {rr['email'] || rr['phoneNumber'] ? (
                                    // Contact Section
                                    <div className="flex mt-2 mb-4 text-muted-foreground">
                                        {rr['email'] ? (
                                            <div className="flex-1 text-xs">
                                                {rr['email']}
                                            </div>
                                        ) : null}
                                        {rr['phoneNumber'] ? (
                                            <div className="flex-1 text-xs">
                                                {rr['phoneNumber']}
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}
                                <Separator className="my-4" />
                                <div className="flex flex-col gap-2 max-w-[320px] mx-auto mt-4">
                                    {action_state === 'fetch-approve' ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Approving...</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                handleApproveAction(rr['_id'])
                                            }
                                        >
                                            Approve Reservation Request
                                        </Button>
                                    )}

                                    {/* Discard Reservation Request Button and Modal Dialog */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive">
                                                Discard Reservation Request
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="hidden">
                                                    Discard This Reservation
                                                    Request
                                                </DialogTitle>
                                                <DialogDescription className="hidden">
                                                    This action cannot be
                                                    undone, are you sure that
                                                    you want to continue?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="text-center">
                                                <H2>
                                                    Discard this reservation
                                                    request?
                                                </H2>
                                                <P>
                                                    This action cannot be
                                                    undone. Are you sure you
                                                    want to continue?
                                                </P>
                                            </div>
                                            <div className="flex justify-center">
                                                {action_state ===
                                                'fetch-delete' ? (
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
                                                        Confirm
                                                    </Button>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Blacklist Email And Modal DIalog */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            {rr['email'] ? (
                                                <Button>Blacklist Email</Button>
                                            ) : (
                                                <Button disabled>
                                                    Blacklist Email
                                                </Button>
                                            )}
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="hidden">
                                                    Add Email to Blacklist?
                                                </DialogTitle>
                                                <DialogDescription className="hidden">
                                                    Blacklisting this email will
                                                    prevent reservations
                                                    containing this email from
                                                    being created. Are you sure
                                                    you wish to continue?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="text-center">
                                                <H2>Add email to blacklist?</H2>
                                                <P>
                                                    Blacklisting the email will
                                                    prevent reservations
                                                    containing this email from
                                                    being created.
                                                </P>
                                                <P>
                                                    Are you sure you want to
                                                    continue?
                                                </P>
                                            </div>
                                            <div className="flex justify-center">
                                                {action_state ===
                                                'fetch-blacklist-email' ? (
                                                    <Button disabled>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        <span>
                                                            Adding to
                                                            blacklist...
                                                        </span>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() =>
                                                            handleBlacklistEmailAction(
                                                                rr['_id'],
                                                                rr['email']
                                                            )
                                                        }
                                                    >
                                                        Confirm
                                                    </Button>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Blacklist Phone Number And Modal DIalog */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            {rr['phoneNumber'] ? (
                                                <Button>
                                                    Blacklist Phone Number
                                                </Button>
                                            ) : (
                                                <Button disabled>
                                                    Blacklist Phone Number
                                                </Button>
                                            )}
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="hidden">
                                                    Add Phone Number to
                                                    Blacklist?
                                                </DialogTitle>
                                                <DialogDescription className="hidden">
                                                    Blacklisting this phone
                                                    number will prevent
                                                    reservations containing this
                                                    phone number from being
                                                    created. Are you sure you
                                                    wish to continue?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="text-center">
                                                <H2>
                                                    Add phone number to
                                                    blacklist?
                                                </H2>
                                                <P>
                                                    Blacklisting this phone
                                                    number will prevent
                                                    reservations containing this
                                                    phone number from being
                                                    created.
                                                </P>
                                                <P>
                                                    Are you sure you want to
                                                    continue?
                                                </P>
                                            </div>
                                            <div className="flex justify-center">
                                                {action_state ===
                                                'fetch-blacklist-phone-number' ? (
                                                    <Button disabled>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        <span>
                                                            Adding to
                                                            blacklist...
                                                        </span>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() =>
                                                            handleBlacklistPhoneNumberAction(
                                                                rr['_id'],
                                                                rr[
                                                                    'phoneNumber'
                                                                ]
                                                            )
                                                        }
                                                    >
                                                        Confirm
                                                    </Button>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </DetailContent>
                        );
                    })}
                </MasterDetail>
            </div>
        </div>
    );
}
