import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

import { useState } from 'react';
import {
    DetailContent,
    DetailTrigger,
    MasterContent,
    MasterDetail,
} from './custom-ui/master-detail';

import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO, parseISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '../ui/use-toast';
import { useReservationContext } from './contexts/ReservationContext';

/** TODO:
 * - Implement Reservation Requests Route
 */

const datetime_form_schema = z.object({
    date: z.coerce.date(),
});

const firstname_form_schema = z.object({
    firstName: z.string().min(3).trim().toLowerCase().regex(/[a-z]/gi),
});

const lastname_form_schema = z.object({
    lastName: z.string().min(3).trim().toLowerCase().regex(/[a-z]/gi),
});
const seats_form_schema = z.object({
    seats: z.number().min(1),
});
const email_form_schema = z.object({
    email: z.string().min(3).max(320).trim().email(),
});
const phonenumber_form_schema = z.object({
    phoneNumber: z.string().min(11).max(13).regex(/[0-9]/gi),
});
const notes_form_schema = z.object({
    notes: z.string().max(128).optional(),
});

export default function ReservationDetailsButton({ data, ...props }) {
    const [is_fetching, setIsFetching] = useState(false);
    const { toast: sendToast } = useToast();

    const { refreshReservationData } = useReservationContext();

    const datetime_form = useForm({
        resolver: zodResolver(datetime_form_schema),
        defaultValues: {
            date: data ? formatISO(parseISO(data['date'])).slice(0, 16) : '',
        },
    });

    const firstname_form = useForm({
        resolver: zodResolver(firstname_form_schema),
        defaultValues: {
            firstName: data ? data['firstName'] : '',
        },
    });

    const lastname_form = useForm({
        resolver: zodResolver(lastname_form_schema),
        defaultValues: {
            lastName: data ? data['lastName'] : '',
        },
    });
    const seats_form = useForm({
        resolver: zodResolver(seats_form_schema),
        defaultValues: {
            seats: data ? data['seats'] : 3,
        },
    });
    const email_form = useForm({
        resolver: zodResolver(email_form_schema),
        defaultValues: {
            email: data ? data['email'] : '',
        },
    });
    const phonenumber_form = useForm({
        resolver: zodResolver(phonenumber_form_schema),
        defaultValues: {
            phoneNumber: data ? data['phoneNumber'] : '',
        },
    });
    const notes_form = useForm({
        resolver: zodResolver(notes_form_schema),
        defaultValues: {
            notes: data ? data['notes'] : '',
        },
    });

    // RENDERING LOGIC
    if (!data) {
        return (
            <Card className="max-w-reservation-card mt-2">
                <CardHeader className="p-2 flex-row-reverse">
                    <Badge className="text-xs">
                        <Skeleton className="h-3 w-2 my-[0.125rem]" />
                    </Badge>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="font-bold text-ellipsis overflow-hidden capitalize">
                        <Skeleton className="h-4 w-full my-[0.125rem]" />
                    </div>
                    <div className="text-ellipsis overflow-hidden capitalize">
                        <Skeleton className="h-4 w-full mt-1" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    // THIS AREA IS CONDITIONALLY EXECUTED BASED ON WHETHER OR NOT THERE IS
    // DATA PASSED INTO THIS COMPONENT
    const handleFormSubmitAction = (values, type) => {
        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        let fetch_url = '';
        let post_payload = {
            id: data['_id'],
        };

        // Determine the fetch POST url and the post payload...
        switch (type) {
            case 'change-datetime':
                fetch_url = `${backend_api_endpoint}/api/reservations/update/date`;
                post_payload['date'] = values['date'];
                break;
            case 'change-firstname':
                fetch_url = `${backend_api_endpoint}/api/reservations/update/firstName`;
                post_payload['firstName'] = values['firstName'];
                break;
            case 'change-lastname':
                fetch_url = `${backend_api_endpoint}/api/reservations/update/lastName`;
                post_payload['lastName'] = values['lastName'];
                break;
            case 'change-seats':
                fetch_url = `${backend_api_endpoint}/api/reservations/update/seats`;
                post_payload['seats'] = values['seats'];
                break;
            case 'change-email':
                fetch_url = `${backend_api_endpoint}/api/reservations/update/email`;
                post_payload['email'] = values['email'];
                break;
            case 'change-phonenumber':
                fetch_url = `${backend_api_endpoint}/api/reservations/update/phonenumber`;
                post_payload['phoneNumber'] = values['phoneNumber'];
                break;
            case 'change-notes':
                fetch_url = `${backend_api_endpoint}/api/reservations/update/notes`;
                post_payload['notes'] = values['notes'];
                break;
            default:
                throw new Error(
                    '[ReservationDetailsButton.js]: Please specify a known type.'
                );
        }

        //Now run the fetch request...
        setIsFetching(true);
        fetch(fetch_url, {
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
                //The request was successful.
                refreshReservationData();
                sendToast({
                    title: 'Success',
                    description:
                        'The first name has been successfully updated!',
                });
            } else {
                //The request was unsuccessful.
                sendToast({
                    title: 'Error',
                    description:
                        'The first name failed to update due to an error.',
                });
            }
        });
    };

    const handleDeleteConfirmAction = () => {
        const post_payload = {
            id: data._id,
        };

        //Construct the POST request.
        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        const fetch_url = `${backend_api_endpoint}/api/reservations/delete`;

        fetch(fetch_url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_payload),
        }).then((r) => {
            if (r.status === 200) {
                //The request was successful.
                refreshReservationData();
                sendToast({
                    title: 'Success',
                    description:
                        'The reservation has been deleted successfully!',
                });
            } else {
                //The request was unsuccessful.
                sendToast({
                    title: 'Error',
                    description:
                        'An error occured while the reservation was being deleted.',
                });
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger className="mt-2">
                <Card className="max-w-reservation-card">
                    <CardHeader className="p-2 flex-row-reverse">
                        <Badge className="text-xs">{data['seats']}</Badge>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="font-bold text-ellipsis overflow-hidden capitalize">
                            {data['firstName']}
                        </div>
                        <div className="text-ellipsis overflow-hidden capitalize">
                            {data['lastName']}
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <DialogHeader className="hidden">
                    <DialogTitle>
                        Reservation Details for {data['firstName']}{' '}
                        {data['lastName']}
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <MasterDetail>
                    <MasterContent>
                        <div className="max-w-full">
                            {/* Content */}
                            {/* Header section */}
                            <div className="max-w-full">
                                <div className="flex flex-nowrap gap-4">
                                    {/* Firstname & Last Name */}
                                    <div className="grow">
                                        <div className="capitalize text-lg">
                                            {data['firstName']}
                                        </div>
                                        <Separator />
                                        <div className="capitalize text-lg text-muted-foreground">
                                            {data['lastName']}
                                        </div>
                                    </div>
                                    {/* Seats */}
                                    <div className="">
                                        <div className="text-3xl text-center">
                                            {data['seats']}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {data['seats'] > 1
                                                ? 'people'
                                                : 'person'}
                                        </div>
                                    </div>
                                </div>
                                {/* Additional Notes Section */}
                                {data['notes'] ? (
                                    <p className="mt-2 break-words max-w-reservation-detail-content">
                                        {data['notes']}
                                    </p>
                                ) : null}
                                {data['email'] || data['phoneNumber'] ? (
                                    // Contact Section
                                    <div className="flex mt-2 mb-4 text-muted-foreground">
                                        {data['email'] ? (
                                            <div className="flex-1 text-xs">
                                                {data['email']}
                                            </div>
                                        ) : null}
                                        {data['phoneNumber'] ? (
                                            <div className="flex-1 text-xs">
                                                {data['phoneNumber']}
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>
                            <Separator />
                            {/* Content Section */}
                            <div className="mt-2">
                                <DetailTrigger
                                    className="w-full"
                                    variant="secondary"
                                    triggerTarget="change-datetime"
                                >
                                    Change Date/Time
                                </DetailTrigger>
                            </div>
                            <div className="mt-2">
                                <DetailTrigger
                                    className="w-full"
                                    variant="secondary"
                                    triggerTarget="change-firstname"
                                >
                                    Change First Name
                                </DetailTrigger>
                            </div>
                            <div className="mt-2">
                                <DetailTrigger
                                    className="w-full"
                                    variant="secondary"
                                    triggerTarget="change-lastname"
                                >
                                    Change Last Name
                                </DetailTrigger>
                            </div>
                            <div className="mt-2">
                                <DetailTrigger
                                    className="w-full"
                                    variant="secondary"
                                    triggerTarget="change-seats"
                                >
                                    Change Seats
                                </DetailTrigger>
                            </div>
                            <div className="mt-2">
                                <DetailTrigger
                                    className="w-full"
                                    variant="secondary"
                                    triggerTarget="change-email"
                                >
                                    Change Email
                                </DetailTrigger>
                            </div>
                            <div className="mt-2">
                                <DetailTrigger
                                    className="w-full"
                                    variant="secondary"
                                    triggerTarget="change-phonenumber"
                                >
                                    Change Phone Number
                                </DetailTrigger>
                            </div>
                            <div className="mt-2">
                                <DetailTrigger
                                    className="w-full"
                                    variant="secondary"
                                    triggerTarget="change-notes"
                                >
                                    Change Notes
                                </DetailTrigger>
                            </div>
                            <div className="mt-2">
                                <DetailTrigger
                                    className="w-full"
                                    variant="destructive"
                                    triggerTarget="delete-confirm"
                                >
                                    Delete
                                </DetailTrigger>
                            </div>
                        </div>
                    </MasterContent>
                    <DetailContent identifier="change-datetime">
                        <Form {...datetime_form}>
                            <form
                                onSubmit={datetime_form.handleSubmit((values) =>
                                    handleFormSubmitAction(
                                        values,
                                        'change-datetime'
                                    )
                                )}
                            >
                                {/* DateTime Input */}
                                <FormField
                                    control={datetime_form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                New Reservation Date & Time
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="block"
                                                    type="datetime-local"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                The new date and time for this
                                                Reservation.{' '}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* The submit button */}
                                <div className="flex justify-center mt-4">
                                    {is_fetching ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Updating...</span>
                                        </Button>
                                    ) : (
                                        <Button type="submit">Update</Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </DetailContent>
                    <DetailContent identifier="change-firstname">
                        <Form {...firstname_form}>
                            <form
                                onSubmit={firstname_form.handleSubmit(
                                    (values) =>
                                        handleFormSubmitAction(
                                            values,
                                            'change-firstname'
                                        )
                                )}
                            >
                                <FormField
                                    control={firstname_form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                New First Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                The new first name to update the
                                                reservation to.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* The submit button */}
                                <div className="flex justify-center mt-4">
                                    {is_fetching ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Updating...</span>
                                        </Button>
                                    ) : (
                                        <Button type="submit">Update</Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </DetailContent>
                    <DetailContent identifier="change-lastname">
                        <Form {...lastname_form}>
                            <form
                                onSubmit={lastname_form.handleSubmit((values) =>
                                    handleFormSubmitAction(
                                        values,
                                        'change-lastname'
                                    )
                                )}
                            >
                                <FormField
                                    control={lastname_form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                The new last name to update the
                                                reservation to.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* The submit button */}
                                <div className="flex justify-center mt-4">
                                    {is_fetching ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Updating...</span>
                                        </Button>
                                    ) : (
                                        <Button type="submit">Update</Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </DetailContent>
                    <DetailContent identifier="change-seats">
                        <Form {...seats_form}>
                            <form
                                onSubmit={seats_form.handleSubmit((values) =>
                                    handleFormSubmitAction(
                                        values,
                                        'change-seats'
                                    )
                                )}
                            >
                                <FormField
                                    control={seats_form.control}
                                    name="seats"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Seats</FormLabel>
                                            <div className="">
                                                {field.value}{' '}
                                                {field.value > 1
                                                    ? 'people'
                                                    : 'person'}
                                            </div>
                                            <FormControl>
                                                <Slider
                                                    min={1}
                                                    max={16}
                                                    step={1}
                                                    onValueChange={(
                                                        new_value
                                                    ) =>
                                                        field.onChange(
                                                            new_value[0]
                                                        )
                                                    }
                                                    value={[field.value]}
                                                    defaultValue={[field.value]}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                The new amount of people to
                                                reserve a spot for in this
                                                reservation.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* The submit button */}
                                <div className="flex justify-center mt-4">
                                    {is_fetching ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Updating...</span>
                                        </Button>
                                    ) : (
                                        <Button type="submit">Update</Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </DetailContent>
                    <DetailContent identifier="change-email">
                        <Form {...email_form}>
                            <form
                                onSubmit={email_form.handleSubmit((values) =>
                                    handleFormSubmitAction(
                                        values,
                                        'change-email'
                                    )
                                )}
                            >
                                <FormField
                                    control={email_form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@email.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                The new email address to update
                                                the reservation to.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* The submit button */}
                                <div className="flex justify-center mt-4">
                                    {is_fetching ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Updating...</span>
                                        </Button>
                                    ) : (
                                        <Button type="submit">Update</Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </DetailContent>
                    <DetailContent identifier="change-phonenumber">
                        <Form {...phonenumber_form}>
                            <form
                                onSubmit={phonenumber_form.handleSubmit(
                                    (values) =>
                                        handleFormSubmitAction(
                                            values,
                                            'change-phonenumber'
                                        )
                                )}
                            >
                                <FormField
                                    control={phonenumber_form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                New Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="18003334444"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                The new phone number to update
                                                to.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* The submit button */}
                                <div className="flex justify-center mt-4">
                                    {is_fetching ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Updating...</span>
                                        </Button>
                                    ) : (
                                        <Button type="submit">Update</Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </DetailContent>
                    <DetailContent identifier="change-notes">
                        <Form {...notes_form}>
                            <form
                                onSubmit={notes_form.handleSubmit((values) =>
                                    handleFormSubmitAction(
                                        values,
                                        'change-notes'
                                    )
                                )}
                            >
                                <FormField
                                    control={notes_form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                New Additional Notes
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="VIP, Vegan, Bottle Service, etc..."
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                Update any remarks about this
                                                reservation.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* The submit button */}
                                <div className="flex justify-center mt-4">
                                    {is_fetching ? (
                                        <Button disabled>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Updating...</span>
                                        </Button>
                                    ) : (
                                        <Button type="submit">Update</Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </DetailContent>
                    <DetailContent identifier="delete-confirm">
                        <h3 className="text-xl text-center font-bold">
                            Are you sure you want to delete this reservation?
                        </h3>
                        <p className="mt-2">
                            This action cannot be undone, are you positive that
                            you want to delete the reservation for{' '}
                            <span className="capitalize italic">
                                {data['firstName'] + ' ' + data['lastName']}
                            </span>
                        </p>
                        <div className="flex justify-center mt-4">
                            <Button
                                variant="destructive"
                                onClick={() => handleDeleteConfirmAction()}
                            >
                                Confirm Delete
                            </Button>
                        </div>
                    </DetailContent>
                </MasterDetail>
            </DialogContent>
        </Dialog>
    );
}
