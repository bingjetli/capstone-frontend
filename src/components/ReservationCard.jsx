import { useState } from 'react';
import Modal from './Modal';
import ReservationModal from './ReservationModal';
import User from './User';

export default function ReservationCard({ data, view, refreshReservations }) {
    const {
        firstName,
        lastName,
        tableId,
        status,
        notes,
        date,
        phoneNumber,
        email,
        seats,
    } = data;

    const [modal_shown, setModalShown] = useState(false);

    switch (view) {
        case 'week':
            return (
                <div
                    className="bg-slate-50 w-full flex flex-row flex-nowrap justify-between gap-2 p-2 border border-slate-100"
                    onClick={() => setModalShown(true)}
                >
                    <div className="flex-1">
                        <div className="capitalize max-w-20 truncate">{`${firstName.charAt(
                            0
                        )}. ${lastName}`}</div>
                        <div className="hidden justify-center items-center md:flex">
                            <div className="text-lg leading-none ">{seats}</div>
                            <div className="w-3 fill-slate-500 translate-y-[2px]">
                                <User />
                            </div>
                        </div>
                    </div>
                    {modal_shown ? (
                        //TODO: the isShown prop is redundant. Fix it someday.
                        <ReservationModal
                            isShown={modal_shown}
                            setVisibility={setModalShown}
                            data={data}
                            refreshReservations={refreshReservations}
                        />
                    ) : null}
                    {/*modal_shown ? (
                        //Conditionally render the modal dialog.
                        <div
                            className={
                                'modal-wrapper fixed top-0 left-0 h-screen w-screen flex flex-col-reverse flex-nowrap items-center z-20 md:justify-center ' +
                                (modal_shown ? 'block' : 'hidden')
                            }
                            onClick={hideModal}
                        ></div>
                    ) : null*/}
                </div>
            );
        case 'day':
        default:
            return (
                <div
                    className="bg-slate-50 w-full h-min reservation-card border"
                    onClick={() => setModalShown(true)}
                >
                    <div className="flex flex-row flex-nowrap justify-between gap-2 p-2 border-s-4">
                        <div className="flex-1 flex flex-row flex-nowrap gap-2">
                            <div className="flex-1 hidden md:block md:capitalize md:text-center">
                                {firstName}
                            </div>
                            <div className="flex-1 hidden md:block md:capitalize md:text-center">
                                {lastName}
                            </div>
                            <div className="flex-1 truncate text-center md:hidden">
                                <span className="inline-block capitalize me-2">
                                    {firstName.charAt(0)}.
                                </span>
                                <span className="inline-block capitalize">
                                    {lastName}
                                </span>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="me-1">{seats}</span>
                                <span className="fill-slate-500 text-xs poppins-light">
                                    <div className="w-4">
                                        <User />
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>

                    <ReservationModal
                        isShown={modal_shown}
                        setVisibility={setModalShown}
                        data={data}
                        refreshReservations={refreshReservations}
                    />
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
