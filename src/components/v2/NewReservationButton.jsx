import { Button } from '@/components/ui/button';
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '../ui/use-toast';

const form_schema = z.object({
    firstName: z.string().min(3).trim().toLowerCase().regex(/[a-z]/gi),
    lastName: z.string().min(3).trim().toLowerCase().regex(/[a-z]/gi),
    email: z.string().min(3).max(320).trim().email(),
    phoneNumber: z.string().min(11).max(13).regex(/[0-9]/gi),
    date: z.coerce.date(),
    seats: z.number().min(1),
    notes: z.string().max(128).optional(),
});

export default function NewReservationButton() {
    const [is_fetching, setIsFetching] = useState(false);
    const [is_open, setIsOpen] = useState(false);

    const { toast } = useToast();

    // Define the form
    const form = useForm({
        resolver: zodResolver(form_schema),
        defaultValues: {
            date: formatISO(new Date()).slice(0, 16),
            firstName: '',
            lastName: '',
            seats: 3,
            email: '',
            phoneNumber: '',
            notes: '',
        },
    });

    // Define the submit handler
    function handleFormSubmitAction(values) {
        //Construct the POST request..
        const post_payload = { status: 'reserved', ...values };
        console.log(
            `Here is the POST request:\n ${JSON.stringify(post_payload)}.`
        );

        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        const fetch_url = `${backend_api_endpoint}/api/reservations/create`;

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

            if (r.status === 201) {
                //The request was successful.
                toast({
                    title: 'Success',
                    description: 'The reservation was created successfully!',
                });
                form.reset();
                setIsOpen(false);
            } else {
                //The request was unsuccessful.
                toast({
                    title: 'Error',
                    description:
                        'The reservation was unable to be created at this time, please try again later.',
                });
            }
        });
    }

    return (
        <Sheet
            open={is_open}
            onOpenChange={setIsOpen}
        >
            <SheetTrigger asChild>
                <Button variant="outline">New Reservation</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Reservation</SheetTitle>
                    <SheetDescription className="hidden">
                        A form to create a new reservation.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        className="max-h-new-reservation-form overflow-auto mt-4 flex flex-col gap-y-8 px-1"
                        onSubmit={form.handleSubmit(handleFormSubmitAction)}
                    >
                        {/* DateTime Input */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date & Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="block"
                                            type="datetime-local"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        The date and time of the reservation.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* First Name Input */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        The first name of the person making the
                                        reservation.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Last Name Input */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        The last name of the person making the
                                        reservation.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Seat Input */}
                        <FormField
                            control={form.control}
                            name="seats"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Seats</FormLabel>
                                    <div className="">
                                        {field.value}{' '}
                                        {field.value > 1 ? 'people' : 'person'}
                                    </div>
                                    <FormControl>
                                        <Slider
                                            min={1}
                                            max={16}
                                            step={1}
                                            onValueChange={(new_value) =>
                                                field.onChange(new_value[0])
                                            }
                                            value={[field.value]}
                                            defaultValue={[field.value]}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        The number of people to reserve a table
                                        for.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Email Input */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        An email address to contact.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* PhoneNumber Input */}
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="18003334444"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        A contact phone number.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Additional Notes Input */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="VIP, Vegan, Bottle Service, etc..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Any other remarks about this
                                        reservation.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* The submit button */}
                        {is_fetching ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>Creating...</span>
                            </Button>
                        ) : (
                            <Button type="submit">Create</Button>
                        )}
                    </form>
                </Form>
                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    );
}
