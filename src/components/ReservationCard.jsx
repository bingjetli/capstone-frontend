export default function ReservationCard({ data, view }) {
    const { firstName, lastName, tableId } = data;

    switch (view) {
        case 'week':
            return (
                <div className="bg-slate-50 w-full flex flex-row flex-nowrap justify-between gap-2 p-2">
                    <div className="flex-1">
                        <div className="max-w-20 truncate">{`${firstName.charAt(
                            0
                        )}. ${lastName}`}</div>
                        <div>
                            {tableId}{' '}
                            <span className="text-xs text-slate-500 poppins-light">
                                seats
                            </span>
                        </div>
                    </div>
                </div>
            );
        case 'day':
        default:
            return (
                <div className="bg-slate-50 w-full h-min reservation-card">
                    <div className="flex flex-row flex-nowrap justify-between gap-2 p-2 border-s-4">
                        <div className="border-e-2 border-e-neutral-200 flex-1 flex flex-row flex-nowrap gap-2">
                            <div className="flex-1 hidden md:block">
                                {firstName}
                            </div>
                            <div className="flex-1 hidden md:block">
                                {lastName}
                            </div>
                            <div className="flex-1 truncate md:hidden">{`${firstName.charAt(
                                0
                            )}. ${lastName}`}</div>
                            <div className="flex-1">
                                {tableId}{' '}
                                <span className="text-slate-500 text-xs poppins-light">
                                    seats
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap gap-2 items-center">
                            <button className="poppins-light bg-slate-200 text-xs px-2 py-1">
                                Edit
                            </button>
                            <button className="poppins-light bg-slate-200 text-xs px-2 py-1">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            );

        // Threaded version, currently unused...
        // return (
        //     <div className="w-full h-min reservation-card z-auto">
        //         <div className="flex flex-row flex-nowrap justify-between gap-2 ms-4 px-2">
        //             <div className="border-e-2 border-e-neutral-200 flex-1">
        //                 <div>{firstName}</div>
        //                 <div>{tableId}</div>
        //             </div>
        //             <div className="flex flex-row flex-nowrap gap-2 items-center">
        //                 <button className="poppins-light bg-slate-200 text-xs px-2 py-1">
        //                     Edit
        //                 </button>
        //                 <button className="poppins-light bg-slate-200 text-xs px-2 py-1">
        //                     Delete
        //                 </button>
        //             </div>
        //         </div>

        //         <div className="border-s-2 border-b-2 bottom-1/2 left-1 h-[150%] w-4 thread">
        //             &nbsp;
        //         </div>
        //     </div>
        // );
    }
}
