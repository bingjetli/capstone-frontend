import { useCallback, useEffect, useState } from 'react';
import {
    addDays,
    addWeeks,
    eachDayOfInterval,
    endOfWeek,
    format,
    getDate,
    getDay,
    lightFormat,
    startOfWeek,
    subDays,
    subWeeks,
} from 'date-fns';
import ReservationContainer from './ReservationContainer';

const DAYS_OF_THE_WEEK = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

function generateDateRange(reference_date, range) {
    switch (range) {
        case 'week':
            return eachDayOfInterval({
                start: startOfWeek(reference_date),
                end: endOfWeek(reference_date),
            });
        case 'day':
        default:
            return reference_date;
    }
}

function ReservationViewerMainContainer({
    children,
    setViewScale,
    currentViewScale,
    setDateRange,
    setReferenceDate,
    currentReferenceDate,
}) {
    //offset is used to determine how much to change the reference date
    //in order to recalcuate the date range.
    const recalculateDateRange = (offset) => {
        switch (currentViewScale) {
            case 'week': {
                const new_reference_date =
                    offset > 0
                        ? addWeeks(currentReferenceDate, offset)
                        : offset < 0
                        ? subWeeks(currentReferenceDate, offset * -1)
                        : new Date();
                setReferenceDate(new_reference_date);
                setDateRange(generateDateRange(new_reference_date, 'week'));
                break;
            }
            case 'day':
            default: {
                const new_reference_date =
                    offset > 0
                        ? addDays(currentReferenceDate, offset)
                        : offset < 0
                        ? subDays(currentReferenceDate, offset * -1)
                        : new Date();
                setReferenceDate(new_reference_date);
                setDateRange(generateDateRange(new_reference_date));
            }
        }
    };

    const updateViewScale = (new_view_scale) => {
        setDateRange(generateDateRange(currentReferenceDate, new_view_scale));
        setViewScale(new_view_scale);
    };

    return (
        <div className="h-full pb-[100px]">
            <div className="bg-slate-50 flex flex-row flex-nowrap gap-2 justify-center py-2 md:justify-end md:pe-2">
                <button
                    className="poppins-light bg-slate-200 py-1 px-2 text-xs"
                    onClick={() => recalculateDateRange(-1)}
                >
                    Prev
                </button>

                <button
                    className={
                        currentViewScale === 'week'
                            ? 'poppins-light bg-emerald-700 py-1 px-2 text-xs text-neutral-50'
                            : 'poppins-light bg-slate-200 py-1 px-2 text-xs'
                    }
                    onClick={() => updateViewScale('week')}
                >
                    Week
                </button>
                <button
                    className={
                        currentViewScale === 'day'
                            ? 'poppins-light bg-emerald-700 py-1 px-2 text-xs text-neutral-50'
                            : 'poppins-light bg-slate-200 py-1 px-2 text-xs'
                    }
                    onClick={() => updateViewScale('day')}
                >
                    Day
                </button>

                <button
                    className="poppins-light bg-slate-200 py-1 px-2 text-xs"
                    onClick={() => recalculateDateRange(1)}
                >
                    Next
                </button>

                <button
                    className="poppins-light bg-slate-200 py-1 px-2 text-xs"
                    onClick={() => recalculateDateRange(0)}
                >
                    Today
                </button>
            </div>
            {children}
        </div>
    );
}

export default function ReservationViewer() {
    const [reference_date, setReferenceDate] = useState(new Date());
    const [view_scale, setViewScale] = useState('week');
    const [date_range, setDateRange] = useState(
        generateDateRange(reference_date, view_scale)
    );
    const [reservation_data, setReservationData] = useState(null);

    const dereferenceReservationIndex = useCallback(
        (idx) => {
            return reservation_data['reservations'][idx];
        },
        [reservation_data]
    );

    useEffect(() => {
        //Side effect to perform the initial data fetch from the server.
        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        fetch(`${backend_api_endpoint}/api/reservations/fetch/all`)
            .then((r) => r.json())
            .then((json) => {
                //const day_groups = {
                //    0: {},
                //    1: {},
                //    2: {},
                //    3: {},
                //    4: {},
                //    5: {},
                //    6: {},
                //};
                const day_groups = [{}, {}, {}, {}, {}, {}, {}];
                json['reservations'].forEach((r, ri) => {
                    const day_numeric = getDay(r['date']);
                    const start_time = lightFormat(r['date'], 'HH:mm');
                    if (start_time in day_groups[day_numeric]) {
                        //If the start-time exists in the time group entries
                        //already, push the index of the current reservation
                        //into the array associated for this time.
                        day_groups[day_numeric][start_time].push(ri);
                    } else {
                        //Otherwise, if this entry doesn't exist yet, we will
                        //need to create the first entry.
                        day_groups[day_numeric][start_time] = [ri];
                    }
                });

                //By this point, we have the reservations and the time groups
                //data set which contain references to the reservation data
                //grouped by their start times.
                setReservationData({
                    reservations: json['reservations'],
                    groupedByDateTime: day_groups,
                });
            });
    }, []);

    //The main container should have a bottom padding equal to the height
    //of the header, because it extends beyond the viewport and the overflow
    //is hidden.
    switch (view_scale) {
        case 'day':
            return (
                <ReservationViewerMainContainer
                    setViewScale={setViewScale}
                    currentViewScale={view_scale}
                    setDateRange={setDateRange}
                    setReferenceDate={setReferenceDate}
                    currentReferenceDate={reference_date}
                >
                    <div className="h-full flex flex-col">
                        <div className="bg-slate-50 text-center poppins-light uppercase text-xs py-2 shadow-[0_3px_3px_-2px_rgba(0,0,0,0.5)]">
                            <div>
                                {format(
                                    reference_date,
                                    "cccc, do 'of' LLLL, u"
                                )}
                            </div>
                        </div>
                        {reservation_data ? (
                            <ReservationContainer
                                data={reservation_data['groupedByDateTime'][1]}
                                dereferenceReservationIndex={
                                    dereferenceReservationIndex
                                }
                                view={view_scale}
                            />
                        ) : null}
                    </div>
                </ReservationViewerMainContainer>
            );
        case 'week':
            return (
                <ReservationViewerMainContainer
                    setViewScale={setViewScale}
                    currentViewScale={view_scale}
                    setDateRange={setDateRange}
                    setReferenceDate={setReferenceDate}
                    currentReferenceDate={reference_date}
                >
                    <div className="h-full flex flex-col flex-nowrap md:flex-row">
                        {date_range.map((d, di) => {
                            return (
                                <div
                                    key={di}
                                    className={`flex-1 text-center flex flex-row flex-nowrap md:flex-col`}
                                >
                                    <div className="bg-neutral-50 w-14 flex flex-col flex-nowrap justify-center poppins-light text-xs px-2 shadow-[4px_0_3px_-3px_rgba(0,0,0,0.5)] me-[3px] md:me-0 md:mb-[3px] md:shadow-[0_4px_3px_-3px_rgba(0,0,0,0.5)] md:px-0 md:py-2 md:w-full md:block">
                                        <div className="uppercase">
                                            {DAYS_OF_THE_WEEK[di].slice(0, 3)}
                                        </div>
                                        <div>{getDate(d)}</div>
                                    </div>

                                    {reservation_data ? (
                                        <ReservationContainer
                                            data={
                                                reservation_data[
                                                    'groupedByDateTime'
                                                ][di]
                                            }
                                            dereferenceReservationIndex={
                                                dereferenceReservationIndex
                                            }
                                            view={view_scale}
                                        />
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </ReservationViewerMainContainer>
            );
        default:
            return (
                <ReservationViewerMainContainer
                    setViewScale={setViewScale}
                    currentViewScale={view_scale}
                    setDateRange={setDateRange}
                    setReferenceDate={setReferenceDate}
                    currentReferenceDate={reference_date}
                >
                    <div className="bg-teal-200 h-full">
                        Unrecognized View Scale : {view_scale}
                    </div>
                </ReservationViewerMainContainer>
            );
    }
}
