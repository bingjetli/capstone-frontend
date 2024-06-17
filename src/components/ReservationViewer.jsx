import { useCallback, useContext, useEffect, useState } from 'react';
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
import SettingsContext from './SettingsContext';

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
            return [reference_date];
    }
}

function ReservationViewerMainContainer({
    children,
    currentViewScale,
    setViewScale,
    currentDateRange,
    setDateRange,
    setReferenceDate,
    currentReferenceDate,
    currentViewDay,
    setViewDay,
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
                //const new_reference_date =
                //    offset > 0
                //        ? addDays(currentReferenceDate, offset)
                //        : offset < 0
                //        ? subDays(currentReferenceDate, offset * -1)
                //        : new Date();
                //setReferenceDate(new_reference_date);
                //setDateRange(generateDateRange(new_reference_date));
                if (currentViewDay + offset < 0) {
                    //User is requesting the previous week. Recalculate
                    //the date range and set the reference date to the
                    //saturday of the week.
                    const new_reference_date = addWeeks(
                        currentReferenceDate,
                        offset
                    );
                    setDateRange(generateDateRange(new_reference_date, 'week'));
                    setReferenceDate(new_reference_date);
                    setViewDay(6);
                } else if (currentViewDay + offset > 6) {
                    //User is requesting the next week. Recalculate the
                    //date range and set the "reference date" to the
                    //Sunday of next week.
                    const new_reference_date = subWeeks(
                        currentReferenceDate,
                        offset * -1
                    );
                    setDateRange(generateDateRange(new_reference_date, 'week'));
                    setReferenceDate(new_reference_date);
                    setViewDay(0);
                } else {
                    //User is requesting a day within the week, so just
                    //update the reference date and currentViewDay.
                    setReferenceDate(currentDateRange[currentViewDay + offset]);
                    setViewDay(currentViewDay + offset);
                }
            }
        }
    };

    const updateViewScale = (new_view_scale) => {
        //setDateRange(generateDateRange(currentReferenceDate, new_view_scale));
        //setViewScale(new_view_scale);
        setViewScale(new_view_scale);
        setReferenceDate(currentDateRange[currentViewDay]);
    };

    return (
        <div className="h-full pb-[100px]">
            <div className="bg-slate-50 flex flex-row flex-nowrap gap-2 justify-center py-2 md:justify-end md:pe-2">
                {currentViewScale === 'week' ? (
                    <div className="poppins-light text-md flex-1 flex justify-center items-center">
                        {format(currentReferenceDate, 'MMM')}
                    </div>
                ) : null}

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

export default function ReservationViewer({ reservationRefreshSignal }) {
    const { settings, setSettings } = useContext(SettingsContext);
    console.log(settings);

    const [reference_date, setReferenceDate] = useState(new Date());
    const [view_scale, setViewScale] = useState('week');
    const [date_range, setDateRange] = useState(
        generateDateRange(reference_date, view_scale)
    );
    //view_day : used specifically for the "day" view scale. Specifies
    //          which day to render in the Reservation Viewer.
    const [view_day, setViewDay] = useState(0);
    const [reservation_data, setReservationData] = useState(null);

    const [refresh_token, setRefreshToken] = useState(false);

    const dereferenceReservationIndex = useCallback(
        (idx) => {
            return reservation_data['reservations'][idx];
        },
        [reservation_data]
    );

    const refreshReservations = () => setRefreshToken(!refresh_token);
    //Automatically call "refreshReservations()" when this component
    //receives a signal. This is also called on initialization.
    useEffect(() => refreshReservations(), [reservationRefreshSignal]);

    useEffect(() => {
        console.log('Useeffect triggered!');
        //Side effect to perform the initial data fetch from the server.
        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        const fetch_url = `${backend_api_endpoint}/api/reservations/fetch?startDate=${date_range[0].getTime()}&endDate=${date_range[
            date_range.length - 1
        ].getTime()}`;
        fetch(fetch_url)
            .then((r) => r.json())
            .then((json) => {
                //Generate an array of empty objects based on the size
                //of the date_range.
                const day_groups = date_range.map(() => new Object());
                console.log(day_groups);
                console.log(json);
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
    }, [date_range, refresh_token]);

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
                    currentDateRange={date_range}
                    setReferenceDate={setReferenceDate}
                    currentReferenceDate={reference_date}
                    setViewDay={setViewDay}
                    currentViewDay={view_day}
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
                                data={
                                    //Uses view_day to determine which day to render. Otherwise,
                                    //renders the first day by default.
                                    reservation_data['groupedByDateTime'][
                                        view_day
                                    ]
                                }
                                dereferenceReservationIndex={
                                    dereferenceReservationIndex
                                }
                                view={view_scale}
                                refreshReservations={refreshReservations}
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
                    currentDateRange={date_range}
                    setReferenceDate={setReferenceDate}
                    currentReferenceDate={reference_date}
                    setViewDay={setViewDay}
                    currentViewDay={view_day}
                >
                    <div className="h-full flex flex-col flex-nowrap md:flex-row">
                        {date_range.map((d, di) => {
                            return (
                                <div
                                    key={di}
                                    className={`flex-1 text-center flex flex-row flex-nowrap md:flex-col border-y-[1px] border-y-slate-300/[.2] md:border-y-0 md:border-x-[1px] md:border-x-slate-300/[.20]`}
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
                                            refreshReservations={
                                                refreshReservations
                                            }
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
                    currentDateRange={date_range}
                    setReferenceDate={setReferenceDate}
                    currentReferenceDate={reference_date}
                    setViewDay={setViewDay}
                    currentViewDay={view_day}
                >
                    <div className="bg-teal-200 h-full">
                        Unrecognized View Scale : {view_scale}
                    </div>
                </ReservationViewerMainContainer>
            );
    }
}
