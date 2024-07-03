import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppBar from '@/components/v2/AppBar';
import NewReservationButton from '@/components/v2/NewReservationButton';
import {
    addWeeks,
    eachDayOfInterval,
    endOfWeek,
    format,
    formatISO,
    parseISO,
    startOfWeek,
    subWeeks,
} from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import ReservationDetailsButton from '../ReservationDetailsButton';
import { ReservationContext } from '../contexts/ReservationContext';

//offset is used to determine how much to change the reference date
//in order to recalcuate the date range.
const recalculateDateRange = (reference_date, offset = 0) => {
    const new_reference_date =
        offset > 0
            ? addWeeks(reference_date, offset)
            : offset < 0
            ? subWeeks(reference_date, offset * -1)
            : new Date();
    return eachDayOfInterval({
        start: startOfWeek(new_reference_date),
        end: endOfWeek(new_reference_date),
    });
};

export default function ReservationsRoute() {
    const [fetch_trigger, setFetchTrigger] = useState(false);
    const refreshReservationData = () => setFetchTrigger(!fetch_trigger);

    const [reference_date, setReferenceDate] = useState(Date.now());
    const date_range = useMemo(
        () => recalculateDateRange(reference_date),
        [reference_date]
    );

    const entry_initializer = useMemo(
        () =>
            JSON.stringify(
                //Serialize the object so we can avoid referencing the
                //same object later when we use it to initialize the entreis.
                Object.fromEntries(
                    date_range.map((dr, dri) => [
                        formatISO(dr, { representation: 'date' }),
                        new Array(),
                    ])
                )
            ),
        [reference_date]
    );

    const initial_state_entry_initializer = useMemo(
        () =>
            JSON.stringify(
                //Serialize the object so we can avoid referencing the
                //same object later when we use it to initialize the entreis.
                Object.fromEntries(
                    date_range.map((dr, dri) => [
                        formatISO(dr, { representation: 'date' }),
                        [null],
                    ])
                )
            ),
        [reference_date]
    );
    const [reservation_data, setReservationData] = useState([
        ['null', JSON.parse(initial_state_entry_initializer)],
        ['null', JSON.parse(initial_state_entry_initializer)],
        ['null', JSON.parse(initial_state_entry_initializer)],
    ]);

    useEffect(() => {
        // We need to find the date range for the reservation data to fetch,
        // typically this will be the week of the reference date
        const date_range = recalculateDateRange(reference_date);

        // Now we can build the fetch request to fetch the reservation data
        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        const fetch_url = `${backend_api_endpoint}/api/reservations/fetch?startDate=${date_range[0].getTime()}&endDate=${date_range[
            date_range.length - 1
        ].getTime()}`;
        fetch(fetch_url)
            .then((r) => r.json())
            .then((json) => {
                const reservations_by_date_time = {};
                // const entry_initializer = JSON.stringify(
                //     //Serialize the object so we can avoid referencing the
                //     //same object later when we use it to initialize the entreis.
                //     Object.fromEntries(
                //         date_range.map((dr, dri) => [
                //             formatISO(dr, { representation: 'date' }),
                //             new Array(),
                //         ])
                //     )
                // );

                json['reservations'].forEach((r, ri) => {
                    const parsed_datetime = parseISO(r['date']);
                    const date = formatISO(parsed_datetime, {
                        representation: 'date',
                    });
                    const time = format(parsed_datetime, 'HH:mm');

                    if (!(time in reservations_by_date_time)) {
                        //It doesn't exist yet, so we need to initialize a new entry.
                        reservations_by_date_time[time] =
                            JSON.parse(entry_initializer);
                    }

                    reservations_by_date_time[time][date].push(r);
                });

                setReservationData(
                    Object.entries(reservations_by_date_time).sort()
                );
            });
        //This effect occurs on first mount, and everytime the reference_date
        //changes as well as the fetch_trigger.
    }, [reference_date, fetch_trigger]);

    return (
        <ReservationContext.Provider
            value={{
                refreshReservationData,
            }}
        >
            <div className="flex flex-col h-screen w-screen max-h-screen">
                <AppBar />
                <Separator />
                <div className="grow p-4 max-h-content">
                    {/* Main reservation wrapper */}
                    <div>
                        {/* Header section */}
                        <div className="flex flex-row-reverse">
                            <NewReservationButton />
                        </div>
                        <h1 className="text-3xl leading-relaxed">
                            {format(reference_date, 'MMM, yyyy')}
                        </h1>
                    </div>
                    <div className="border rounded-md overflow-x-auto max-h-reservation-viewer">
                        <Table>
                            {/* Content Section */}
                            <TableHeader className="sticky top-0 bg-background outline outline-1 outline-border">
                                <TableRow>
                                    {date_range.map((dr, dri) => (
                                        <TableHead key={formatISO(dr)}>
                                            <div className="text-center">
                                                {format(dr, 'iii')}
                                            </div>
                                            <div className="text-center">
                                                {format(dr, 'do')}
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody className="reservation-table-body-clear">
                                {
                                    // Generate the table body from the reservation data,
                                    // each entry in the reservation data object corresponds
                                    // to a time, this time ought to be sorted already.
                                    reservation_data.map(
                                        ([rd_time, rd], rdi) => (
                                            <TableRow key={rdi}>
                                                {
                                                    //Each table row will also have 7 cells, each
                                                    //cell corresponds to the 7 days, and so we'll
                                                    //map each cell as such.
                                                    Object.values(rd).map(
                                                        (rde, rdei) => (
                                                            <TableCell
                                                                key={rdei}
                                                                className="py-4 px-2 align-top hover:border"
                                                            >
                                                                {
                                                                    //We need to check if the array has any
                                                                    //reservations assigned to it, just because
                                                                    //it exists doesn't mean that there are
                                                                    rde.length >
                                                                    0 ? (
                                                                        //If we find that there are indeed reservations
                                                                        //for this date and time, we'll render the time
                                                                        //as well as all the associated reservations.
                                                                        <div className="h-full">
                                                                            <h2 className="text-muted-foreground text-xs">
                                                                                {rd_time ===
                                                                                'null' ? (
                                                                                    <Skeleton className="h-4 w-8 my-1" />
                                                                                ) : (
                                                                                    rd_time
                                                                                )}
                                                                            </h2>
                                                                            <div className="flex flex-col justify-start items-center">
                                                                                {rde.map(
                                                                                    (
                                                                                        rder,
                                                                                        rderi
                                                                                    ) => (
                                                                                        <ReservationDetailsButton
                                                                                            data={
                                                                                                rder
                                                                                            }
                                                                                            key={
                                                                                                // Check if there is a valid ID, otherwise use the index ID as the key
                                                                                                // This interacts with the component rendering such that a new form will
                                                                                                // be generated for a new component instead of using the null values since
                                                                                                // they are only initialized once.
                                                                                                rder
                                                                                                    ? rder[
                                                                                                          '_id'
                                                                                                      ]
                                                                                                    : rderi
                                                                                            }
                                                                                        />
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                            </TableCell>
                                                        )
                                                    )
                                                }
                                            </TableRow>
                                        )
                                    )
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </ReservationContext.Provider>
    );
}
