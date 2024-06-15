import { useMemo } from 'react';
import ReservationCard from './ReservationCard';

export default function ReservationContainer({
    data,
    dereferenceReservationIndex,
    view,
}) {
    const sorted_data_entries = useMemo(() => {
        return Object.entries(data).sort(([a_time], [b_time]) => {
            //Since the parameters a and b are returned as arrays containing
            //one element which holds the time. We destructure it in the
            //comparator function.
            return a_time.localeCompare(b_time);
        });
    }, [data]);

    switch (view) {
        case 'day':
        case 'week': {
            const container_css =
                view === 'day'
                    ? 'mt-[2px] flex flex-col flex-nowrap overflow-auto w-full h-full p-2'
                    : 'flex flex-row flex-nowrap overflow-auto w-full h-full px-2 gap-8 md:px-1 md:flex-col';

            const time_css =
                view === 'day'
                    ? 'flex flex-col mb-4 time-div'
                    : 'flex flex-col min-w-24 text-xs py-2 md:min-w-min';

            const time_reservations_css =
                view === 'day'
                    ? 'flex flex-col flex-nowrap flex-1 reservations-div gap-2'
                    : 'flex flex-row flex-nowrap flex-1 gap-2 md:flex-col';

            return (
                <div className={container_css}>
                    {sorted_data_entries.map(([t, tr], ei) => {
                        return (
                            <div
                                key={ei}
                                className={time_css}
                            >
                                <div className="text-start poppins-light">
                                    {t}
                                </div>
                                <div className={time_reservations_css}>
                                    {tr.map((ri, rii) => (
                                        <ReservationCard
                                            key={rii}
                                            data={dereferenceReservationIndex(
                                                ri
                                            )}
                                            view={view}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        default:
            return <div>Unknown View Type</div>;
    }
}
