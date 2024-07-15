import AppBar from '@/components/v2/AppBar';
import { Separator } from '@/components/ui/separator';
import {
    DetailContent,
    DetailTrigger,
    MasterContent,
    MasterDetail,
} from '../custom-ui/master-detail';
import { useEffect, useState } from 'react';
import { useNetworkContext } from '@/components/NetworkContext';
import { useToast } from '@/components/ui/use-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Loader2 } from 'lucide-react';
import { H1, H2, H4, Muted, P } from '../custom-ui/typography';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const form_schema = z.object({
    email: z.optional(z.string().min(3).max(320).trim().email()),
    phoneNumber: z.optional(
        z
            .string()
            .min(11)
            .max(13)
            .regex(/[0-9]*/gi)
    ),
});

export default function BlacklistRoute() {
    const form = useForm({
        resolver: zodResolver(form_schema),
        defaultValues: {
            email: '',
            phoneNumber: '',
        },
    });

    const [blacklist, setBlacklist] = useState([
        {
            dateBlacklisted: null,
        },
        {
            dateBlacklisted: null,
        },
        {
            dateBlacklisted: null,
        },
    ]);

    const [fetch_trigger, setFetchTrigger] = useState(false);
    const refreshBlacklistData = () => setFetchTrigger(!fetch_trigger);

    const [entry_details_is_open, setEntryDetailsIsOpen] = useState(false);

    const { apiFetch } = useNetworkContext();
    const { toast: sendToast } = useToast();

    const handleDeleteConfirmAction = (id) => {
        const post_payload = {
            id: id,
        };

        setActionState('fetch-delete');
        apiFetch('/api/blacklist/delete', {
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
                        'The entry has been successfully remove from the blacklist.',
                });

                //Return the current viewport back the to master screen
                //and refresh the reservation request data.
                setEntryDetailsIsOpen(false);
                refreshBlacklistData();
            } else {
                //The request was unsuccessful...
                sendToast({
                    title: 'Error',
                    description:
                        'There was an error preventing the entry from being removed from the blacklist.',
                });
            }
        });
    };

    //action_state is used to keep track of which action is currently
    //being processed by the app. For Example, null means there is no
    //action currently being processed, "fetch-delete" means that there
    //is a fetch request occuring and the delete action is being processed;
    //"fetch-approve" is the same, but meaning that there is an approve
    //action being processed.
    const [action_state, setActionState] = useState(null);

    useEffect(() => {
        apiFetch('/api/blacklist/fetch/all')
            .then((r) => {
                if (r.status !== 204) {
                    return r.json();
                }
            })
            .then((json) => {
                if (json) {
                    setBlacklist(json.blacklistEntries);
                } else {
                    setBlacklist([]);
                }
            });
    }, [fetch_trigger]);

    const handleCreateAction = (values) => {
        const post_payload = {
            ...values,
        };

        setActionState('fetch-create');
        apiFetch('/api/blacklist/delete', {
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
                sendToast({
                    title: 'Success',
                    description:
                        'The contact information was successfully added to the blacklist.',
                });

                refreshBlacklistData();
            } else {
                //The request was unsuccessful...
                sendToast({
                    title: 'Error',
                    description:
                        'An error occured while adding entry to the blacklist.',
                });
            }
        });
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            <AppBar />
            <Separator />
            <div className="blacklist-main-wrapper grow max-h-content p-4">
                <div className="blacklist-header-wrapper">
                    <div className="flex flex-row-reverse">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    New Blacklist Item
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="hidden">
                                        New Blacklist Entry
                                    </DialogTitle>
                                    <DialogDescription className="hidden">
                                        Create a new entry in the blacklist?
                                    </DialogDescription>
                                </DialogHeader>
                                <div>
                                    <H2>Create a new blacklist entry</H2>
                                </div>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(
                                            handleCreateAction
                                        )}
                                    >
                                        {/* Email Input */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="mt-4">
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="example@email.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-xs">
                                                        An email address to
                                                        contact.
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
                                                <FormItem className="mt-4">
                                                    <FormLabel>
                                                        Phone Number
                                                    </FormLabel>
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
                                        {/* The submit button */}
                                        <div className="mt-4 flex justify-center">
                                            {action_state === 'fetch-create' ? (
                                                <Button disabled>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    <span>Creating...</span>
                                                </Button>
                                            ) : (
                                                <Button type="submit">
                                                    Create
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <H1>Blacklist</H1>
                </div>
                {blacklist.length <= 0 ? (
                    <div className="mt-4 text-center">
                        <P>There are no items in the blacklist</P>
                    </div>
                ) : (
                    <div className="blacklist-main-content-wrapper border rounded-md max-h-reservation-viewer mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No.</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Date Blacklisted
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Email
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Phone Number
                                    </TableHead>
                                    <TableHead className="md:hidden">
                                        Email/Phone Number
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blacklist.map((be, bei) => (
                                    <Dialog key={be['_id']}>
                                        <DialogTrigger asChild>
                                            <TableRow key={bei}>
                                                <TableCell>{bei}</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <P>
                                                        {be &&
                                                        be['dateBlacklisted']
                                                            ? format(
                                                                  parseISO(
                                                                      be[
                                                                          'dateBlacklisted'
                                                                      ]
                                                                  ),
                                                                  'PPpp'
                                                              )
                                                            : null}
                                                    </P>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <P>{be['email']}</P>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <P>{be['phoneNumber']}</P>
                                                </TableCell>
                                                <TableCell className="md:hidden">
                                                    {be && be['email'] ? (
                                                        <P>{be['email']}</P>
                                                    ) : null}
                                                    {be && be['phoneNumber'] ? (
                                                        <P>
                                                            {be['phoneNumber']}
                                                        </P>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="hidden">
                                                    New Blacklist Entry
                                                </DialogTitle>
                                                <DialogDescription className="hidden">
                                                    Create a new entry in the
                                                    blacklist?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <MasterDetail>
                                                <MasterContent>
                                                    {be &&
                                                    be['dateBlacklisted'] ? (
                                                        <Muted>
                                                            <span>
                                                                Blacklisted on
                                                            </span>
                                                            <span> </span>
                                                            <span>
                                                                {format(
                                                                    parseISO(
                                                                        be[
                                                                            'dateBlacklisted'
                                                                        ]
                                                                    ),
                                                                    'PPpp'
                                                                )}
                                                            </span>
                                                        </Muted>
                                                    ) : (
                                                        <Skeleton />
                                                    )}
                                                    {be ? (
                                                        <div className="text-center my-4">
                                                            {be &&
                                                            be['email'] ? (
                                                                <H4>
                                                                    {
                                                                        be[
                                                                            'email'
                                                                        ]
                                                                    }
                                                                </H4>
                                                            ) : null}
                                                            {be &&
                                                            be[
                                                                'phoneNumber'
                                                            ] ? (
                                                                <H4>
                                                                    {
                                                                        be[
                                                                            'phoneNumber'
                                                                        ]
                                                                    }
                                                                </H4>
                                                            ) : null}
                                                        </div>
                                                    ) : (
                                                        <Skeleton />
                                                    )}
                                                    <Separator className="my-4" />
                                                    <DetailTrigger
                                                        triggerTarget="remove-from-blacklist"
                                                        variant="destructive"
                                                        className="w-full"
                                                    >
                                                        Remove from the
                                                        blacklist
                                                    </DetailTrigger>
                                                </MasterContent>
                                                <DetailContent identifier="remove-from-blacklist">
                                                    <H2>Remove this entry?</H2>
                                                    <P>
                                                        Are you sure that you
                                                        want to remove this
                                                        entry from the
                                                        blacklist? The following
                                                        details will be removed
                                                        from the blacklist:
                                                    </P>
                                                    <div className="flex justify-center border rounded-md p-4 my-4">
                                                        <small>
                                                            {be['email']}
                                                        </small>
                                                        <small>
                                                            {be['phoneNumber']}
                                                        </small>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        {action_state ===
                                                        'fetch-delete' ? (
                                                            <Button
                                                                variant="destructive"
                                                                disabled
                                                            >
                                                                Removing...
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() =>
                                                                    handleDeleteConfirmAction(
                                                                        be[
                                                                            '_id'
                                                                        ]
                                                                    )
                                                                }
                                                            >
                                                                Confirm
                                                            </Button>
                                                        )}
                                                    </div>
                                                </DetailContent>
                                            </MasterDetail>
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}
